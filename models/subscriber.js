const mongoose = require("mongoose"),
subscriberSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String
});
module.exports = mongoose.model("Subscriber", subscriberSchema)