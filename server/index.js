let express = require('express');
let app = express();
const cors = require("cors");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let annotationController = require('./controllers/controllerAnnotation.js');


app.post('/api',function(req,res){
    console.log(req.body.description);
    // if(err) {
    //     res.status(400).json(err);
    //   }
    //   else
    //   {
    //     res.json(result);
    //   }
});


app.use('/',annotationController);


let PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
