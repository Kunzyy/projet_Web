let Applications = require('../queries/applications.js');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());

router.get('/getAll', function (req, res) {
    Applications.getAll(function(err, result){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            res.json(result.rows);
        }
    })
});

router.post('/getDescrById', function(req, res) {
    Applications.getDescrById(req.body,function(err, result){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        else{
            res.json(result.rows[0]);
        }
    })
});


module.exports = router;
