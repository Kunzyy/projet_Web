let Annotation = require('../queries/annotation');
let runAnnotation = require('../runAnnotations/runAnnotations');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());


router.post('/addBdd', function (req, res) {
    Annotation.addBdd(req.body, function (err,result) {
      console.log(req.body);
      if(err) {
          console.log(err)
        res.status(400).json(err);
      }
      else
      {
        Annotation.addAnnotation(req.body,function (err2,result2) {
            console.log(req.body);
            if(err) {
                console.log(err2);
              res.status(400).json(err2);
            }
            else
            {
              res.json(result2);
            }
          });
      }
    });
});

router.post('/runAnnotation', function(req, res) {
    runAnnotation(req.body.nbrImgGen, req.body.nbrMaxObj)
        .then(res => {

            }
        )
        .catch(err => {

        })
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
    Annotation.delete(req.data, function(err,result){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log(result);
            res.json(result);
        }
    })
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

router.post('/delete')

module.exports = router;
