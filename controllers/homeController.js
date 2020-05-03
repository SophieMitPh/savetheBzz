exports.getIndexPage = (req, res) => {
    res.render("index")
};

var productTitles = [
    {
        title: "Jeans",
    },
    {
        title: "Shirt",
    },
    {
        title: "Skirt",
    },
    {
        title: "Jeans",
    },
    {
        title: "Shirt",
    },
    {
        title: "Skirt",
    },
    {
        title: "Jeans",
    },
    {
        title: "Shirt",
    },
    {
        title: "Skirt",
    }
];

exports.getProductOverview = (req, res) => {
    res.render("productOverview", {
        productNames: productTitles,
    });
};

exports.getProductDetailView = (req, res) => {
    let paramsName = req.params.product;
    res.render("productDetailView", { product: paramsName });
};

exports.getCartView = (req, res) => {
    res.render("cart");
}

