let User = require('../queries/users.js');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());


router.post('/inscription', function (req, res) {
    User.addUser(req.body,function(err,result){
        if(err) {
            console.log(err);
            console.log(err.constraint);
            if(err.constraint ===  'users_email_key'){
                res.json(err);
            }
            else{
                res.status(400).json(err);
            }
        }
        else {
            console.log(result);
            res.json(result.rows[0].user_id);
        }
    });
});

router.post('/checkLogin', function (req, res) {

    User.checkLogin(req.body,function(err,result){
        if(err) {
            res.status(400).json(err);
            console.error(err);
        }
        else {
            console.log(result);
            if(result.rowCount){
                console.log("Good Password");
                res.json(result.rows[0]);
            }
            else{
                console.log("Bad password");
                res.json(0);
            }
        }
    });
});

router.get('/getAll', function(req,res){
    User.getAll(function(err, result) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.json(result.rows);
        }
    })
});

module.exports = router;
