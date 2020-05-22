const express = require('express'),
    app = express();

const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const subscribersController = require('./controllers/subscribersController');
const productController = require('./controllers/productController');
const methodOverride = require('method-override')
const layouts = require("express-ejs-layouts");
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30020 : 3002)
app.set('port', port)
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static('public'));
app.get("/", homeController.getIndexPage);
app.get("/signUp", subscribersController.getSignUp);
app.post("/contact", subscribersController.showSignUp);
app.get("/products", productController.getAllProducts);
app.get("/product/:productName", productController.getProductDetailView);
app.get("/cart", homeController.getCartView);
app.get("/wishlist", homeController.getWishList);
app.get("/addProduct", productController.getAddProductView);
app.post("/newProduct", productController.saveProduct);
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
    res.render("subscribers", { subscribers: req.data });
});
app.use(errorController.logErrors);
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

module.exports = app;