const port = 3000,
    express = require('express'),
    app = express(),
    homeController = require('./controllers/homeController'),
    layouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Go to /products for more");
});

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});

app.get("/cart", homeController.getCartView);
app.get("/products", homeController.getProductOverview);
app.get("/product/:product", homeController.getProductDetailView);
