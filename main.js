const port = 3000,
    express = require('express'),
    app = express();

const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

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
app.get("/signUp", homeController.getSignUp);
app.post("/contact", homeController.showSignUp);
app.get("/products", homeController.getProductOverview);
app.get("/product/:product", homeController.getProductDetailView);
app.get("/cart", homeController.getCartView);

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});
app.use(errorController.logErrors);
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

var subscriber1 = new Subscriber({
    name: "Jon",
    lastname: "Wexler",
    email: "jon@jonwexler.com",
    password: "12345"
});
subscriber1.save((error, savedDocument) => {
    if (error) console.log(error);
    console.log(savedDocument);
});
var product1 = new Product({
    name: "Skirt",
    price: "55",
    description: "100% silk blue skirt"
});
product1.save((error, savedDocument) => {
    if (error) console.log(error);
    console.log(savedDocument);
});

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});