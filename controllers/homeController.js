
module.exports = {
	getIndexPage: (req, res) => {
		res.render('home');
	},

	getProductDetailView: (req, res) => {
		let paramsName = req.params.product;
		res.render('productDetailView', {product: paramsName});
	},

	getCartView: (req, res) => {
		res.render('cart');
	},

	getWishList: (req, res) => {
		res.render('wishList');
	},
};
