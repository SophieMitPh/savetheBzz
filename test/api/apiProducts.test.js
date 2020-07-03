const { app, Product, User, request } = require('../commonJest')
var faker = require('faker');
let userData;

async function getJWT(userData) {
  let jwt = ''
  await request(app)
    .post('/api/login')
    .send({ email: userData.email, password: userData.password })
    .then(response => {
      jwt = response.body.token
    })
  return jwt
}

describe('API: Product list', () => {
  let threeProducts
  beforeAll(async () => {
    threeProducts = await Promise.all([
            Product.create({name: 'shirt123', price: 25, description: '100% cotton T-shirt'}),
            Product.create({name: 'Silk blouse', price: 60, description: 'Beige silk blouse'}),
            Product.create({name: 'Leather skirt', price: 59, description: 'faux leather skirt'}) 
        ])
    })

  it('register the user', (done) => {
    userData = {
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    const testUser = new User(userData)
    User.register(testUser, userData.password, (error, user) => {
      if (error) { done(error) }
      done()
    })
  })

  it('show ok on /api/products', async (done) => {
    const jwt = await getJWT(userData)
    request(app)
      .get('/api/products')
      .set('token', jwt)
      .expect(200, done)
  })

  it('show all products in db with api', async (done) => {
    const jwt = await getJWT(userData)
    request(app)
      .get('/api/products')
      .set('token', jwt)
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
    const jwt = await getJWT(userData)
    const products = await Product.find({})
    const numberOfProducts = products.length
    request(app)
      .get('/api/products')
      .set('token', jwt)
      .then((response) => {
        expect(response.body.data.products.length).toBe(numberOfProducts)
        done()
      })
  })
})