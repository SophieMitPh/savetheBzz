const { app, request, Product, removeID } = require('../commonJest')

const productData = {
            name: 'Bracelet',
            price: 30,
            description: 'Silver bracelet with colourful stones.'
}

describe('Product Show', function () {
  let productName
  beforeEach(function (done) {
    Product.create(productData)
      .then(created => {
        productName = created.name
        done()
      })
      .catch(error => {
        done(error.message)
      })
  })
  it('renders Product show correctly', (done) => {
    request(app)
      .get(`/product/${productData.name}`)
      .then((response) => {
        expect(response.text).toMatchSnapshot()
        done()
      })
  })
})