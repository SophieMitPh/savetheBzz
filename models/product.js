const mongoose = require("mongoose"),
productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String
});
module.exports = mongoose.model("Product", productSchema)