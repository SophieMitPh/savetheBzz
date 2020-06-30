const {app, Subscriber, request} = require('../../commonJest');
var randomEmail = require('random-email');
describe('subscriberController', () => {
	let subscriberItems;
	beforeEach(async () => {
		subscriberItems = await Promise.all([
            Subscriber.create({
                name: 'Bob',
                lastname: 'Middleton',
                email: randomEmail({ domain: 'example.com' })
            }),
			Subscriber.create({
                name: 'Mary',
                lastname: 'Kate',
                email: randomEmail({ domain: 'example.com' })
            }),
		]);
	});

	describe('subscriber list', () => {
		it('show ok on /subscribers', ((done) => {
			request(app)
				.get('/subscribers')
				.expect(200, done);
		}));
		it('show all subscribers in db',  ((done) => {
			request(app)
				.get('/subscribers')
				.then((res) => {
					const body = res.text;
					for(const subscriber of subscriberItems){
						expect(body).toContain(subscriber.name);
						expect(body).toContain(subscriber.lastname);
					}
					done();
				});
		}));
    });
});
