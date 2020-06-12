
module.exports = {
	getIndexPage: (req, res) => {
		res.render('home');
	},

	getProductDetailView: (req, res) => {
		let paramsName = req.params.product;
		res.render('products/productDetailView', {product: paramsName});
	},

	getCartView: (req, res) => {
		res.render('cart');
	},

	getWishList: (req, res) => {
		res.render('wishList');
	},

	getPersonalAccount: (req, res) => {
		res.render('account/account');
	},

	getShippingAddress: (req, res) => {
		res.render('account/address');
	},

	getPaymentMethods: (req, res) => {
		res.render('account/payment');
	}
};
