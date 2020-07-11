var express = require("express");
const env = require("dotenv").config();
const rout = require("./routes/api");
var app = express();
var bodyParser = require('body-parser');


var port = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("welcome");
});

app.use("/api", rout);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("running on port" + port);
});