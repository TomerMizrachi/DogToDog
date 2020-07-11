const mongoose = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/DogToDog?retryWrites=true&w=majority`;
const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(url, options)
    .then(db => console.log(`connected to: ${db.connection.name}`))
    .catch(err => console.error("connection error: ", err));

const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    email: {type: String, required: true, unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    name: String,
    password: {type: String, required: true},
    breed: String,
    age: Number,
    image: String,
    likedUsers: [Number],
    superLikedUsers: [Number],
    dislikedUsers: [Number],
    likedBy: [Number]
});

const Users = model("Users", usersSchema);

module.exports = Users;