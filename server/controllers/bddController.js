let Bdd = require('../queries/bdd.js');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());

router.get('/getAll', function(req,res){
    Bdd.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.json(result.rows);
        }
    })
});

module.exports = router;
