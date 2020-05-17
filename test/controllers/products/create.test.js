const {app, Product, request} = require('../../commonJest');
describe('productController', () => {
	let productItems;
	beforeEach(async () => {
		productItems = await Promise.all([
			Product.create({name: 'shirt', price: 25, description: '100% cotton T-shirt'}),
			Product.create({name: 'Silk blouse', price: 60, description: 'Beige silk blouse'}),
			Product.create({name: 'Leather skirt', price: 59, description: 'faux leather skirt'})   
		]);
	});

	describe('product list', () => {
		it('show ok on /products', ((done) => {
			request(app)
				.get('/products')
				.expect(200, done);
		}));
		it('show all products in db',  ((done) => {
			request(app)
				.get('/products')
				.then((res) => {
					const body = res.text;
					for(const product of productItems){
						expect(body).toContain(product.name);
					}
					done();
				});
		}));
	});
});
