const {app, User, request} = require('../../commonJest');
var randomEmail = require('random-email');
describe('userController', () => {
	let UserItems;
	beforeEach(async () => {
		UserItems = await Promise.all([
            User.create({
                name:
                {
                    first: 'Bob',
                    last: 'Middleton'
                },
                email: randomEmail({ domain: 'example.com' }),
                password: 'asdfghj23rkl'
            }),
			User.create({
                name:
                {
                    first: 'Mary',
                    last: 'Kate'
                },
                email: randomEmail({ domain: 'example.com' }),
                password: 'asdwe34t423fwel'
            }),
		]);
	});

	describe('User list', () => {
		it('show ok on /Users', ((done) => {
			request(app)
				.get('/users')
				.expect(200, done);
		}));
		it('show all Users in db',  ((done) => {
			request(app)
				.get('/users')
				.then((res) => {
					const body = res.text;
					for(const user of UserItems){
						expect(body).toContain(user.name.first);
						expect(body).toContain(user.name.last);
					}
					done();
				});
		}));
	});
});
