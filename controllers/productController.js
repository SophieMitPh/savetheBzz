const mongoose = require("mongoose"),
    Product = require("../models/product");

exports.getAllProducts = (req, res, next) => {
    Product.find({}, (error, products) => {
        if (error) next(error);
        req.data = products;
        next();
    });
};