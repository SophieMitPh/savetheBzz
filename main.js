const port = 3000,
    express = require('express'),
    homeController = require('./controllers/homeController'),
    layouts = require("express-ejs-layouts"),
    errorController = require('./controllers/errorController');
    app = express();


app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static('public'));

app.use(errorController.logErrors);
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.get("/", (req, res) => {
    res.send("Go to /products for more");
});
app.get("/products", homeController.getProductOverview);
app.get("/product/:product", homeController.getProductDetailView);
app.get("/cart", homeController.getCartView);

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});

