const { app, User, request } = require('../../commonJest');
var faker = require('faker');

const agent = request.agent(app)

const user = {
  name: {
    first: faker.name.firstName(),
    last: faker.name.lastName()
  },
  email: faker.internet.email(),
  password: faker.internet.password()
};
let userRegistered;

describe('Register the user and check authentification', () => {
  beforeAll(async (done) => {
    userRegistered = new User(user)
    User.register(userRegistered, user.password, (error, user) => {
      if (error) { done(error) }
      agent
        .post("/users/login")
        .send({
          email: user.email,
          password: user.password
        })
        .then(res => {
          done()
        })
    })
  })

  test('user is authenticated', (done) => {
    agent
      .get('/')
      .then((res) => {
        expect(res.text).toContain('Logged in');
        expect(res.text).toContain(userRegistered.fullName);
        done()
      })
  });
});