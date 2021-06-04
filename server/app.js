let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let cors = require("cors");

let userController = require('./controllers/userController.js');
let annotationController = require('./controllers/annotationController.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});*/

/*
app.post('/api',function(req,res){
    console.log(req.body.description);
    // if(err) {
    //     res.status(400).json(err);
    //   }
    //   else
    //   {
    //     res.json(result);
    //   }
});*/

app.use('/users', userController);
app.use('/annotations',annotationController);
app.use('/refAppli',annotationController);
app.use('/applications',annotationController);
app.use('/database',annotationController);


let PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
