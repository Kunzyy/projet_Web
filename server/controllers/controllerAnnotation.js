let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.json());
let Annotation = require('../queries/annotation');

//on ajoute d'abord la bdd avant d'ajouter l'annotation

router.post('/annotation', function (req, res) {
    Annotation.addBdd(req, function (err,result) {
      console.log(req.body);
      if(err) {
        res.status(400).json(err);
      }
      else
      {
        Annotation.addAnnotation(req,function (err,result2) {
            console.log(req.body);
            if(err) {
              res.status(400).json(err);
            }
            else
            {
              res.json(result2);
            }
          });
      }
    });




  });
  

  module.exports = router;