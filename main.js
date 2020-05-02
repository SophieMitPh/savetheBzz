const port = 3000,
    express = require('express'),
    app = express();

const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const layouts = require("express-ejs-layouts");

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

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});

