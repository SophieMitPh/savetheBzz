const { app, Product, request } = require('../../commonJest');

describe('Product Index', function () {
	const productData = {
		name: 'Jeans',
		description: 'Some awesome Jeans',
		price: 55,
	};
	let productProps;
	beforeAll(function (done) {
		Product.create(productData)
			.then(created => {
				productProps = created.Product;
				done();
			})
			.catch(error => {
				console.log('error caught: ' + error.message);
				done(error.message);
			});
	});
	it('renders product detail page correctly', async (done) => {

		console.log('__________________' + productData.name + '__________________________');
		request(app)
			.get('/products/Jeans')
			.then((response) => {
				expect(response.text).toMatchSnapshot();
				done();
			});
	});
});