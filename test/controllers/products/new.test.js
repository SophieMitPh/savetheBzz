const {app, request} = require('../../commonJest')

describe('Shows new product view', () => {
    it('gets the view', (done) => {
        request(app)
            .get('/products/new')
            .expect(200, done)
    })
})