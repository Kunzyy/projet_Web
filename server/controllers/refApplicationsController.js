let RefApplications = require('../queries/refApplications.js');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());


router.post('/inscription', function (req, res) {


});

module.exports = router;
