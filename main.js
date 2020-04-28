const port = 3000,
    express = require('express'),
    app = express();

const homeController = require('./controllers/homeController');

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Go to /productOverview.ejs or /productDetailView.ejs for more");
});

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.listen(port, () => {
    console.log(`The express server has started on port ${port}`);
});

app.get("/productOverview.ejs", homeController.getProductOverview);
app.get("/productDetailView.ejs", homeController.getProductDetailView);
