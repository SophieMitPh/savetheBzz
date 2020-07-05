const {app, request} = require('../../commonJest')

describe('Shows new subscriber view', () => {
    it('gets the view', (done) => {
        request(app)
            .get('/subscribers/new')
            .expect(200, done)
    })
})