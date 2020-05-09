const mongoose = require("mongoose"),
    Product = require("../models/product");

exports.newProduct = (req, res) => {
    res.send(req.data.name);
};

exports.getProductDetailView = (req, res) => {
    let paramsName = req.params.productName;
    Product.findOne({ name: paramsName }).exec().then((p) => {
        res.render("productDetailView", { productName: paramsName, description: p.description, price: p.price });
    })
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
        let productName = req.body.name;
        let productDescription = req.body.description;
        let productPrice = req.body.price;
        res.render("productDetailView", { productName: productName, description: productDescription, price: productPrice });
    })
};