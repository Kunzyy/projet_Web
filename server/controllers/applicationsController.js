let Applications = require('../queries/users.js');
let express = require('express');
let bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.json());




module.exports = router;
