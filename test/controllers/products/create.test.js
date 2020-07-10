const { Product, app, request} =  require ('../../commonJest');

let productData

describe('Creates and saves the product', () => {
    beforeEach(() => {
        productData = {
            name: 'Black shorts',
            price: 25,
            description: 'Shorts made out of bio-cotton.'
        }
    })

    it('save the product directly', (done) => {
        const testProduct = new Product(productData)
        testProduct.save()
            .then(() => {
                Product.find({ name: productData.name })
                    .then(result => {
                        expect(result.length).toBe(1)
                        expect(result[0]).toHaveProperty('_id')
                        done()
                    })
            })
            .catch((error) => {
                done(error.message)
            })
    })

    it('create product via post request', (done) => {
        request(app)
            .post('/products/create')
            .send(productData)
            .then( res => {
                Product.find({ name: productData.name})
                    .then(result => {
                        expect(result.length).toBe(2)
                        expect(result[1]).toHaveProperty('_id')
                        done()
                    })
            })
            .catch((error) => {
                done(error.message)
            })
    })
})

