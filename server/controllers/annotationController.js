let Annotation = require('../queries/annotation');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());


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
