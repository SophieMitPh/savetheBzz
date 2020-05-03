const mongoose = require("mongoose"),
    Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => {
    Subscriber.find({}, (error, subscribers) => {
        if (error) next(error);
        req.data = subscribers;
        next();
    });
};

exports.getSignUp = (req, res) => {
    res.render("signUp")
};

exports.showSignUp = (req, res) => {
    let signUpData = req.body
    let newSubscriber = new Subscriber({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    });
    newSubscriber.save((error, result) => {
        if(error) res.send(error);
        res.render("contact", { name: signUpData.name, lastname: signUpData.lastname, email: signUpData.email });
    })
    
};