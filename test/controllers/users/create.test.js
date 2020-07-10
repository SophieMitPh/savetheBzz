const { User, app, request } = require('../../commonJest');
var faker = require('faker');

let userData;

describe('Creates and saves the User', () => {
    beforeEach((done) => {
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

    it('create User via post request', (done) => {
        request(app)
            .post('/users/create')
            .send(userData)
            .then(res => {
                User.find({ email: userData.email })
                    .then(result => {
                        console.log(result)
                        expect(result.length).toBe(1)
                        expect(result[0]).toHaveProperty('_id')
                        done()
                    })
            })
            .catch((error) => {
                done(error.message)
            })
    })
})