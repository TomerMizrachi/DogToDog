const DogToDog = require("../db/connector");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




class DogToDogController {
    static async CreatUser(req, res) {
        try {
            DogToDog.find({ email: req.body.email })
                .exec()
                .then(user => {
                    if (user.length >= 1) {
                        return res.status(409).json({
                            message: "Mail exists"
                        });
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            } else {
                                const user = new DogToDog({
                                    _id: new mongoose.Types.ObjectId(),
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash,
                                    breed: req.body.breed,
                                    age: req.body.age,
                                    image: req.body.image
                                });
                                user
                                    .save()
                                    .then(result => {
                                        console.log(result);
                                        res.status(201).json({
                                            message: "User created"
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json({
                                            error: err
                                        });
                                    });
                            }

                        });
                    }
                });
        } catch (err) {
            console.log(err);
            res.status(500).send("Error occured");
        }
    };

    static async login(req, res) {
        DogToDog.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            user: user[0],
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed"
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    };

    static async getID(req, res) {
        try {
            let data = await DogToDog.find({ _id: req.params._id }, err => {
                if (err) throw err;
            });

            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Error occured");
        }
    }

    static async getAll(req, res) {
        try {
            let data = await DogToDog.find({}, err => {
                if (err) throw err;
            });

            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send("Error occured");
        }
    }

    static async updateUser(req, res) {
        try {
            let obj = await DogToDog.find({ email: req.params.email }, err => {
                if (err) throw err;
            });
            if (obj.length == 0) throw { msg: "error" };
            obj = obj[0];

            console.log(obj, req.body);

            // if (req.body._id) obj._id = req.body._id;
            // if (req.body.email) obj.email = req.body.email;
            // if (req.body.password) obj.password = req.body.password;
            // if (req.body.breed) obj.breed = req.body.breed;
            // if (req.body.age) obj.age = req.body.age;
            // if (req.body.image) obj.image = req.body.image;
            if (req.body.likedUsers && req.body.dislikedUsers) {
                obj = { $addToSet: { "dislikedUsers": req.body.dislikedUsers, "likedUsers": req.body.likedUsers } };
            }
            if (req.body.likedBy) {
                obj = { $addToSet: { "likedBy" : req.body.likedBy } };
            }
            await DogToDog.updateOne({ email: req.params.email }, obj, err => {
                if (err) throw err;
            });
            res.status(200).send("updated");
        } catch (err) {
            console.log(err);
            res.status(500).send("Error occured");
        }
    }

    static async deleteUser(req, res) {
        try {
            console.log(req.body);
            let deleteOne = await DogToDog.deleteOne({ email: req.params.email }, err => {
                if (err) throw err;
            });
            res.status(200).send("deleted");
        } catch (err) {
            console.log(err);
            res.status(500).send("Error occured");
        }
    }
}

module.exports = DogToDogController;