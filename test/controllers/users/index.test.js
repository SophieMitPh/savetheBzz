const {app, User, request} = require('../../commonJest');
var faker = require('faker');

describe('userController', () => {
	let UserItems;
	beforeEach(async () => {
		UserItems = await Promise.all([
            User.create({
                name:
                {
                    first: faker.name.firstName(),
                    last: faker.name.lastName()
                },
                email: faker.internet.email(),
                password: faker.internet.password()
            }),
			User.create({
                name:
                {
                    first: faker.name.firstName(),
                    last: faker.name.lastName()
                },
                email: faker.internet.email(),
                password: faker.internet.password()
            }),
		]);
	});

	describe('User list', () => {
		it('show ok on /Users', ((done) => {
			request(app)
				.get('/users')
				.expect(200, done);
		}));
		it('show all Users in db',  (done) => {
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
		});
	});
});
