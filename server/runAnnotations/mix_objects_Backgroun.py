import os
import numpy as np
import PIL
import matplotlib.pyplot as plt
import sys
import argparse
import hashlib
import cv2
import tensorflow as tf

parser = argparse.ArgumentParser(description='Generation d images')
parser.add_argument('nbr_images', type=int, default=500, help='Nombre d images a generer')
parser.add_argument('max_nbr_objs', type=int, default= 3, help='Nombre maximum d objets à appliquer')
parser.add_argument('nb_classes', type=int, help='nombre de classes d images a ajouter')
parser.add_argument('annotation_id', type=int, help='ID d annotation necessaire pour la creation d un dossier')
parser.add_argument('bdd_index', type=int, help='index de la BDD a utiliser')
args = parser.parse_args()

def int64_feature(value):
    return tf.train.Feature(int64_list=tf.train.Int64List(value=[value]))

def int64_list_feature(value):
    return tf.train.Feature(int64_list=tf.train.Int64List(value=value))

def bytes_feature(value):
    return tf.train.Feature(bytes_list=tf.train.BytesList(value=[value]))

def bytes_list_feature(value):
    return tf.train.Feature(bytes_list=tf.train.BytesList(value=value))

def float_list_feature(value):
    return tf.train.Feature(float_list=tf.train.FloatList(value=value))

def get_output_filename(output_dir, name, idx):
    return os.path.join(output_dir, '{}_{:03}.tfrecord'.format(name, idx))

def find_limits(projection, epsilon):
    """ This function finds the interval where the histogram is at (eps:1-eps)
    """
    integration = 0
    start = 0
    for i in range(len(projection)):
        integration += projection[i]
        if not start and integration > epsilon:
            start = i
        if integration > 1 - epsilon:
            end = i
            break
    return (start, end)

def find_bounding_box(alpha_channel):
    """Find the bounding box of an image, based on its alpha channel
    The idea is to project the alpha value on the X and Y axis to get their histogram,
    then to define the box where 99,9% of the image opacity is.
    :param alpha_channel: Image alpha channel
    :returns: (x, y, width, height) of the bounding box
    """
    prj_h = np.sum(alpha_channel, axis=0)
    prj_v = np.sum(alpha_channel, axis=1)
    prj_tot = np.sum(prj_h)

    # Find bounding box limits along X and Y
    (sx, ex) = find_limits(prj_h / prj_tot, 0.001)
    (sy, ey) = find_limits(prj_v / prj_tot, 0.001)

    return (sx, sy, ex - sx, ey - sy)


def load_object(path, size, rotation=0,flip=False):
    """ Load a object image, with alpha channel included, and resize it, rotate it,
    and ajust its bounding box tightly

    :param path: Path to the image
    :param size: Highest dimension (width or height) of the final image [px]
    :param rotation: Rotation to apply to the image [deg]
    :param flip: True to flip the image along the horizontal axis
    :returns: object image"""

    # Open image
    obj = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if obj is None:
        return "bad_image"
    obj = cv2.cvtColor(obj, cv2.COLOR_BGRA2RGBA)
    if flip:
        obj = cv2.flip(obj, 0)
    (height, width) = obj.shape[:2]

    # Increase canvas size to ensure to make any rotation without losing pixels
    dim = int(max(height, width) * 2 ** 0.5)
    new_canvas = np.zeros((dim, dim, 4), dtype=np.uint8)

    offx = (dim - width) // 2
    offy = (dim - height) // 2
    new_canvas[offy:offy + height, offx:offx + width, :] = obj
    obj = new_canvas

    # Apply the rotation
    rot_mtx = cv2.getRotationMatrix2D((dim // 2, dim // 2), rotation, 1)
    obj = cv2.warpAffine(obj, rot_mtx, (dim, dim))

    # Find bounding box and remove what is outside
    alpha_channel = obj[:, :, 3]
    (x, y, w, h) = find_bounding_box(alpha_channel)
    obj = obj[y:y + h, x:x + w, :]
    (height, width) = (h, w)

    # Resize image so that its highest dimension is 'size'
    f_width = width / size
    f_height = height / size
    f = max(f_width, f_height)
    obj = cv2.resize(obj, None, fx=1 / f, fy=1 / f,
                     interpolation=cv2.INTER_AREA)

    return obj


def load_background(path, target_width, target_height):
    """Load a background image, while ensuring its size fits the requested one.
    If needed, image is cropped to preserve the aspect ratio.
    :param path: Path to the image
    :param target_width: Desired width
    :param target_height: Desired height
    :returns: background image"""

    background = cv2.imread(path)
    if background is None:
        return "bad_image"
    background = cv2.cvtColor(background, cv2.COLOR_BGR2RGB)

    # Find scaling factor, so that the image is just bigger than requested (one dimension fit, the other is bigger)
    (height, width) = background.shape[:2]
    f_width = width / target_width
    f_height = height / target_height
    f = min(f_width, f_height)

    # Resize
    background = cv2.resize(background, None, fx=1 / f, fy=1 / f,
                            interpolation=cv2.INTER_AREA)
    (height, width) = background.shape[:2]

    # Then crop what is outside the requested size, with a random offset
    (height, width) = background.shape[:2]
    if height > target_height:
        offset = int(np.random.uniform(0, height - target_height))

        # offset = (height-target_height)//2
        background = background[offset:offset + target_height, :, :]
    elif width > target_width:

        offset = int(np.random.uniform(0, width - target_width))

        # offset = (width-target_width)//2
        background = background[:, offset:offset + target_width, :]

    return background


def add_obj_to_background(background, obj, x, y, blurr=0):
    """ Patch a background image by the addition of a foreground image.
    The two images are combined by mixing them according to the obj alpha channel.

    :param background: Background image
    :param obj: object image to add to the background
    :param x: x position in the background where to add the object.
    :param y: y position in the background where to add the object.
    :returns: background image"""

    obj_alpha = obj[:, :, 3]
    obj_rgb = obj[:, :, :3]
    (height, width) = obj.shape[:2]

    # For each alpha value at x, y position, create a triplet of this same value
    alpha_factor = 0.9 * obj_alpha[:, :, np.newaxis].astype(np.float32) / 255.0
    alpha_factor = np.concatenate((alpha_factor, alpha_factor, alpha_factor), axis=2)

    # Compute the patch to apply to the image (mix of background and foreground)
    obj_rgb = obj_rgb.astype(np.float32) * alpha_factor
    patch = background.astype(np.float32)[y:y + height, x:x + width] * (1 - alpha_factor)
    patch += obj_rgb

    # patch the image
    background[y:y + height, x:x + width] = patch.astype(np.uint8)

    # A bit of blurring
    kernel_size = int(round(3 * blurr)) * 2 + 1
    blurred = cv2.GaussianBlur(background, (kernel_size, kernel_size), 0)

    return blurred


def retrieve_background(path_background):
    back_paths = []
    for path in os.listdir(path_background):
        img_path = os.path.join(path_background, path)
        img = cv2.imread(img_path)
        if img is not None:
            back_paths.append(img_path)
    return back_paths


def retrieve_obj_with_class(path_object):
    obj_paths = []
    for class_obj in os.listdir(path_object):
        class_obj_path = os.path.join(path_object, class_obj)
        print(class_obj_path)
        if os.path.isdir(class_obj_path):
            for path in os.listdir(class_obj_path):
                img_path = os.path.join(class_obj_path, path)
                img = cv2.imread(img_path)
                if img is not None:
                    obj_paths.append((img_path, class_obj))
    return obj_paths


def add_to_tfrecord(img_filename, data, tfrecord_writer):
    # with tf.io.gfile.GFile(img_filename, 'rb') as fid:
    with tf.gfile.GFile(img_filename, 'rb') as fid:
        encoded_jpg = fid.read()
    image = PIL.Image.open(img_filename)
    if image.format != 'JPEG':
        raise ValueError('Image format not JPEG')
    sha256 = hashlib.sha256(encoded_jpg).hexdigest()

    width, height = image.size

    xmin, ymin, xmax, ymax, classes, classes_text, truncated, poses, difficult_obj = data
    
    example = tf.train.Example(features=tf.train.Features(feature={
            'image/height': int64_feature(height),
            'image/width': int64_feature(width),
            'image/filename': bytes_feature(img_filename.encode('utf16')),
            'image/source_id': bytes_feature(img_filename.encode('utf16')),
            'image/key/sha256': bytes_feature(sha256.encode('utf16')),
            'image/encoded': bytes_feature(encoded_jpg),
            'image/format': bytes_feature('jpeg'.encode('utf16')),
            'image/object/bbox/xmin': float_list_feature(xmin),
            'image/object/bbox/xmax': float_list_feature(xmax),
            'image/object/bbox/ymin': float_list_feature(ymin),
            'image/object/bbox/ymax': float_list_feature(ymax),
            'image/object/class/text': bytes_list_feature(classes_text),
            'image/object/class/label': int64_list_feature(classes),
            'image/object/bbox/difficult': int64_list_feature(difficult_obj),
            'image/object/bbox/truncated': int64_list_feature(truncated),
            'image/object/view': bytes_list_feature(poses),
        }))
    tfrecord_writer.write(example.SerializeToString())


def generate_images(back_paths, obj_paths, tfrecord_writer, class_dict, output_path='result', nbr_images=10, max_nbr_objs=5, size_range=(60, 250), back_size=800):
    
    csv_lines = []
    csv_lines_TS = []
    random_class_index = []
    class_names = os.listdir(".\\bdd\\bdd{}\\objects_with_class".format(args.bdd_index))
    class_dict_temp = class_dict
    class_names_temp = class_names
    
    for i in range (args.nb_classes) :
        rand_index = np.random.choice(class_names_temp)
        class_names_temp.remove(rand_index)
        random_class_index.append(rand_index)
    
    for img_idx in range(nbr_images):
        back_path = np.random.choice(back_paths)
        nbr_objs = np.random.choice(range(0, max_nbr_objs)) + 1
        obj_sizes = [np.random.uniform(*size_range) for _ in range(nbr_objs)]
        obj_sizes.sort(reverse=False)
        # Load backgroud image
        b = load_background(back_path, back_size, back_size)

        xmin = []
        ymin = []
        xmax = []
        ymax = []
        classes = []
        classes_text = []
        truncated = []
        poses = []
        difficult_obj = []
        
        for obj_index in range(nbr_objs):
            obj_size = obj_sizes[obj_index]
            rdidx= np.random.choice(range(0, len(random_class_index)))
            choice_index = np.random.choice(range(len(obj_paths)))
            a = os.path.join(".\\bdd\\bdd{}\\objects_with_class".format(args.bdd_index), class_names_temp[rdidx])
            c = np.random.choice(os.listdir(a))
            obj_path = os.path.join(a, c)
            obj_class = class_names_temp[rdidx]
            x = int(np.random.uniform(back_size - obj_size - 1))
            y = int(np.random.uniform(back_size - obj_size - 1))
            angle = int(np.random.uniform(0, 360))
            flip = np.random.choice((True, False))
            blurr = np.random.uniform()

            # Combine background and foreground
            obj = load_object(obj_path, obj_size, angle, flip)
            b = add_obj_to_background(b, obj, x, y, blurr)
            (height, width) = obj.shape[:2]
            
            xmin.append(x)
            ymin.append(y)
            xmax.append(x + width)
            ymax.append(y + height)
            classes_text.append(obj_class.encode('utf16'))
            classes.append(class_dict[obj_class])
            truncated.append(int(0))
            poses.append(''.encode('utf16'))
            difficult_obj.append(int(0))  

        # Save image
        img_filename = 'gen_{:04d}.jpg'.format(img_idx)
        img_filename = os.path.join(output_path, img_filename)
        img = tf.keras.preprocessing.image.array_to_img(b)
        img.save(img_filename)

        data = (xmin, ymin, xmax, ymax, classes, classes_text, truncated, poses, difficult_obj)
        add_to_tfrecord(img_filename, data, tfrecord_writer)
        
        for i in range(nbr_objs):
            csv_lines.append('{} {},{},{},{},{}\n'.format(img_filename, xmin[i],
                         ymin[i], xmax[i], ymax[i], classes[i]))
        
        with open(os.path.join(output_path, 'annotations.csv'), 'w') as f:
            # f.write('img_filename,xmin,ymin,xmax,ymax,classe\n')
            for l in csv_lines:
                f.write(l)

if not os.path.exists('.\\result\\annotation{}'.format(args.annotation_id)):
    os.makedirs('.\\result\\annotation{}'.format(args.annotation_id))            
back_paths = retrieve_background('.\\bdd\\bdd{}\\Background'.format(args.bdd_index))



obj_paths = retrieve_obj_with_class('.\\bdd\\bdd{}\\objects_with_class'.format(args.bdd_index))


def read_classes(class_filename):
    with open('data/keys.names') as f:
        lines = f.readlines()
    return {l.strip():i for i, l in enumerate(lines)}

# !mkdir result

class_dict = read_classes('data/keys.names')
tf_filename = get_output_filename('.\\result\\annotation{}'.format(args.annotation_id), 'keys', 1)
# with tf.io.TFRecordWriter(tf_filename) as tfrecord_writer:
with tf.python_io.TFRecordWriter(tf_filename) as tfrecord_writer:
    generate_images(back_paths, obj_paths, tfrecord_writer, class_dict, '.\\result\\annotation{}'.format(args.annotation_id), args.nbr_images, args.max_nbr_objs, size_range=(70, 200), back_size=800)

print("Execution du code python terminee avec succes")
