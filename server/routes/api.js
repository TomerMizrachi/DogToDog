const rout = require("express").Router();
const users = require("../controllers/DogToDogController");
const checkAuth = require('../middelware/check-auth'); // to add to method how need token



rout.post("/createUser", (req, res) => {
    users.CreatUser(req, res);
});

rout.post("/login", (req, res) => {
    users.login(req, res);
});

rout.get("/", (req, res) => {
    users.getAll(req, res);
});

rout.get("/getOneUser/:id", (req, res) => {
    users.getID(req, res);
});

rout.put("/update/:email", (req, res) => {
    users.updateUser(req, res);
});

rout.delete("/deleteOneUser/:email", (req, res) => {
    users.deleteUser(req, res);
});


module.exports = rout;