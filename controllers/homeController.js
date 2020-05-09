exports.getIndexPage = (req, res) => {
    res.render("index")
};

exports.getProductDetailView = (req, res) => {
    let paramsName = req.params.product;
    res.render("productDetailView", { product: paramsName });
};

exports.getCartView = (req, res) => {
    res.render("cart");
}

exports.getWishList = (req, res) => {
    res.render("wishList")
}
