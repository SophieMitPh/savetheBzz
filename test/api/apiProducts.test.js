const { app, Product, request } = require('../commonJest')

describe('API: Product list', () => {
  let threeProducts
  beforeAll(async () => {
    threeProducts = await Promise.all([
            Product.create({name: 'shirt123', price: 25, description: '100% cotton T-shirt'}),
            Product.create({name: 'Silk blouse', price: 60, description: 'Beige silk blouse'}),
            Product.create({name: 'Leather skirt', price: 59, description: 'faux leather skirt'}) 
        ])
    })
  it('show ok on /api/products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200, done)
  })
  it('show all products in db with api', (done) => {
    request(app)
      .get('/api/products')
      .then((response) => {
        const body = response.text
        for (const product of threeProducts) {
          expect(body).toContain(product._id)
          expect(body).toContain(product.name)
        }
        done()
      })
  })
  it('check the added products amount with api', async (done) => {
    const products = await Product.find({})
    const numberOfProducts = products.length
    request(app)
      .get('/api/products')
      .then((response) => {
        expect(response.body.data.products.length).toBe(numberOfProducts)
        done()
      })
  })
})