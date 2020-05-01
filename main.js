const port = 3000,
    express = require('express'),
    app = express();

const homeController = require('./controllers/homeController');
const layouts = require("express-ejs-layouts");
const errorController = require('./controllers/errorController');

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static('public'));

app.use(errorController.logErrors);
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.get("/", (req, res) => {
    res.send("Go to /product/:product or /products for more");
});
app.get("/products", homeController.getProductOverview);
app.get("/product/:product", homeController.getProductDetailView);

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});