exports.getIndexPage = (req, res) => {
    res.render("index")
};

exports.getSignUp = (req, res) => {
    res.render("signUp")
};

exports.showSignUp = (req, res) => {
    let signUpData = req.body
    res.render("contact", { name: signUpData.name, email: signUpData.email })
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
