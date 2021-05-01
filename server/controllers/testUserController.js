let User = require('../queries/testUser.js');
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
            res.json(rows);
        }
    });
});

module.exports = router;
