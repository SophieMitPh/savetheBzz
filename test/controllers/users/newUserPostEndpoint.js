const {app, Subscriber, Product, User, request} = require('../../commonJest');
var randomEmail = require('random-email');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
///// not working tests!!!! //////////////
/*describe('Post Endpoints for user', () => {
  it('should create a new post', async () => {
    const newsubscriber = await request(app)
      .post("/subscribers/create")
      .send({
          Sunscriber: {
            name: "a",
            lastname: "b",
            email: randomEmail({ domain: 'example.com' })
          }
       
      })
      .set('Accept', 'application/json');
      expect(newsubscriber.body).toBe("New Student");

    const response = await request(app).get("/subscribers");
    expect(response.body.length).toBe(1);
})
})*/