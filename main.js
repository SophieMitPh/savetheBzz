const port = 3000,
    express = require('express'),
    app = express();

const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const subscribersController = require('./controllers/subscribersController');
const productController = require('./controllers/productController');

const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/save-the-bzz",
    { useNewUrlParser: true }
);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

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

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});
app.use(errorController.logErrors);
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});