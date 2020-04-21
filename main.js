const port = 3000,
    http = require("http"),
    httpStatusCodes = require("http-status-codes"),
    router = require("./router"),
    fs = require("fs"),
    plainTextContentType = {
        "Content-Type": "text/plain"
    },
    htmlContentType = {
        "Content-Type": "text/html"
    },
    customReadFile = (file, res) => {
        fs.readFile(`./${file}`, (errors, data) => {
            if (errors) {
                console.log("Error reading the file...");
            }
            res.end(data);
        });
    };
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("Got to /productOverview.html or /productDetailview.html for more");
});
router.get("/productOverview.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/productOverview.html", res);
});
router.get("/productDetailview.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, htmlContentType);
    customReadFile("views/productDetailview.html", res);
});
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number:
➥ ${port}`);
