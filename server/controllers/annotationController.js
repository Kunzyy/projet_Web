let Annotation = require('../queries/annotation');
let Bdd = require('../queries/bdd');
let runAnnotation = require('../runAnnotations/runAnnotations');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());

function getBdd(bddId, nbrClasses) {
    return new Promise(((resolve, reject) => {
        if(bddId !== 0){
            resolve(bddId);
        }
        else{
            //code pour sauvegarder la bdd
            //upload de fichiers non fonctionnel pour l'instant
            // => get bddSize
            const bddSize = 3;

            Bdd.addBdd(bddSize, nbrClasses, function(err,result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result.rows[0].bdd_id);
                }
            });
        }
    }));
}

router.post('/runAnnotation', function(req, res) {

    const data = req.body;
    console.log(data);
    getBdd(data.bddId,data.nbrClasses)
        .then(bddId => {
            const bddName = 'bdd' + bddId;
            Annotation.addAnnotation(data, bddId, function(err, result){
                if(err){
                    res.status(400).json(err);
                }
                else{
                    const newAnnotationId = result.rows[0].annotation_id;
                    runAnnotation(data, newAnnotationId, bddName)
                        .then(() => {
                                res.json(newAnnotationId);
                            }
                        )
                        .catch(err2 => {
                            res.status(400).json(err2)
                        })
                }
            })
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.get('/getAll', function(req, res){
    Annotation.getAll(function(err, result){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log(result.rows);
            res.json(result.rows);
        }
    })
})

router.post('/delete', function(req, res){
    Annotation.delete(req.body, function(err,result){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.json(result);
        }
    })
})

module.exports = router;
