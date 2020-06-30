const {app, Subscriber, Product, User, request} = require('../../commonJest');
var randomEmail = require('random-email');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
///// not working tests!!!! //////////////
const user = {
  email: 'bob.miller@example.com',
  password: 'bobmiller'
}
let token;
beforeAll ((done) => {
    request(app)
      .post("/api/login")
      .send({
        user
      })
      .set('Accept', 'application/json')
      .end((errr, response) => {
        token = response.body.token;
        console.log(token)
        done();
      })
});

describe('GET /api/users', () => {
  test('It respons with JSON', () => {
    return request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      console.log(response)
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json');
    })
  })
})