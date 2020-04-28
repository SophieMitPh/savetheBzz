exports.getProductOverview = (req, res) => {
    res.render("productOverview");
};

exports.getProductDetailView = (req, res) => {
    let paramsName = req.params.product;
    res.render("productDetailView", { product: paramsName });
};

