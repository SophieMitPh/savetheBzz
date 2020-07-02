const { Subscriber, app, request } = require('../../commonJest');
var faker = require('faker');

let subscriberData;

describe('Creates and saves the subscriber', () => {
    beforeEach(() => {
        subscriberData = {
            name: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email()
        }
    })

    it('save the subscriber directly', (done) => {
        const testSubscriber = new Subscriber(subscriberData)
        testSubscriber.save()
            .then(() => {
                Subscriber.find({ email: subscriberData.email })
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

    it('create subscriber via post request', (done) => {
        request(app)
            .post('/subscribers/create')
            .send(subscriberData)
            .then(res => {
                Subscriber.find({ email: subscriberData.email })
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