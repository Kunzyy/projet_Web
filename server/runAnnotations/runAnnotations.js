const {spawn}= require('child_process');

function runAnnotation (data, newAnnotationId, bddName)
    {
        return new Promise((resolve, reject) => {
            const child = spawn('python3',
                [
                    'server/runAnnotations/mix_objects_Backgroun.py',   //args 0   Permet d'appeler le code python
                    data.nbrImgGen,    //args nbre d'images à générer
                    data.nbrMaxObj,    //args nbre max d'objets à appliquer
                    data.nbrClasses,
                    newAnnotationId,
                    bddName
                ]);
            child.on('exit', (code) => {
                console.log('child process exited with' +
                    `code ${code}`);
            });

            child.on('close', () => {
                console.log("Process closed");
            });

            child.stdin.on('data', (data) => {
                console.log(`childstdout: \t ${data}`)
            });
            child.stdout.on('data', (data) => {
                //console.log('Output Python : ');
                console.log(`${data}`);
                resolve(`${data}`);
            });

            child.stderr.on('data', (data) => {
                console.log(`childstdout: \t ${data}`)
                reject(`${data}`);
            });
        });
}

module.exports = runAnnotation;
