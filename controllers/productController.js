const mongoose = require("mongoose"),
    Product = require("../models/product");

exports.newProduct = (req, res) => {
    res.send(req.data.name);
};

exports.getAddProductView = (req, res) => {
    res.render("addProduct");
};

exports.getAllProducts = (req, res, next) => {
    Product.find({})
    .exec()
            .then ((products) => {
                res.render("productOverView", {
                    products: products
                });
            }).catch((error) => {
                console.log(error.message);
                return [];
            }).then(() => {
                console.log("Promise complete")
            });
    };

exports.saveProduct = (req, res, next) => {
    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });

    newProduct.save((error, result) => {
        if (error) res.send(error);
        let product = req.body.name;
        res.render("productDetailView", { product: product });
    })
};