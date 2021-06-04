let User = require('../queries/users.js');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());


router.post('/inscription', function (req, res) {

    User.addUtilisateur(req,function(err,rows){
        if(err) {
            res.status(400).json(err);
            console.error(err);
        }
        else
        {
            console.log(rows);
            res.json(rows);
        }
    });
});

router.post('/checkLogin', function (req, res) {

    User.checkLogin(req.body,function(err,result){
        if(err) {
            res.status(400).json(err);
            console.error(err);
        }
        else
        {
            if(result.rows[0].count === '1'){
                console.log("Good Password");
                res.json(1);
            }
            else{
                console.log("Bad password")
                res.json(0);
            }
        }
    });
});


module.exports = router;
