const { app, User, request } = require('../../commonJest');
var randomEmail = require('random-email');
const agent = request.agent(app)
const user = {
  name: {
    first: "Kate",
    last: "Brown"
  },
  email: 'bob.miller@example.com',
  password: 'bobmiller'
};
let userRegistered;

describe('register the user', () => {
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

  test('is authenticated', (done) => {
    agent
      .get('/')
      .then((res) => {
        expect(res.text).toContain('Logged in');
        expect(res.text).toContain(userRegistered.fullName);
        done()
      })
  });
});