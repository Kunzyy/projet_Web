let express = require("express");

let PORT = process.env.PORT || 3001;

let app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
