let express = require('express');
let app = express();

let userController = require('./controllers/testUserController.js');

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use('/user', userController);


let PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
