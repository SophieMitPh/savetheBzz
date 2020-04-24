const port = 3000,
    http = require("http"),
    httpStatusCodes = require("http-status-codes"),
    router = require("./router"),
    fs = require("fs"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils")

router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.plaintxt);
    res.end("Got to /productOverview.html or /productDetailview.html for more");
});
router.get("/productOverview.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.html);
    utils.getFile("views/productOverview.html", res);
});
router.get("/productDetailview.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.html);
    utils.getFile("views/productDetailview.html", res);
});
router.get("/cart.png", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.png)
    utils.getFile("public/images/cart.png", res)
})
router.get("/logo.png", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.png)
    utils.getFile("public/images/logo.png", res)
})
router.get("/account.png", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.png)
    utils.getFile("public/images/account.png", res)
})
router.get("/nopicture.png", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.png)
    utils.getFile("public/images/nopicture.png", res)
})
router.get("/wishlist.png", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.png)
    utils.getFile("public/images/wishlist.png", res)
})
router.get("/header.css", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.css)
    utils.getFile("public/css/header.css", res)
})
router.get("/products.css", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.css)
    utils.getFile("public/css/products.css", res)
})
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);
