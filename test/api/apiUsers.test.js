
const { app, User, request } = require('../commonJest');
var faker = require('faker');

function registerUsers (userData, i, users, done) {
	if (i === userData.length) {
		done();
	} else {
		const ud = userData[i];
		const newUser = new User(ud);
		User.register(newUser, ud.password, (e, user) => {
			if (user) {
				users.push(user);
			} else {
				done(e);
			}
			registerUsers(userData, i + 1, users, done);
		});
	}
}
async function getJWT (userData) {
	let jwt = '';
	await request(app)
		.post('/api/login')
		.send({ email: userData.email, password: userData.password })
		.then(response => {
			jwt = response.body.token;
		});
	return jwt;
}
describe('API: user list', () => {
	const users = [];
	const userCount = 5;
	const userData = [];

	beforeAll(async (done) => {
		for (let i = 0; i < userCount; i++) {
			userData.push({
				name: {
					first: faker.name.firstName(),
					last: faker.name.lastName()
				},
				email: faker.internet.email(),
				password: faker.internet.password()
			});
		}
		registerUsers(userData, 0, users, done);
	});

	it('check initialisation', () => {
		expect(users.length).toBe(userCount);
		expect(userData.length).toBe(userCount);
	});

	it('get json web token', function (done) {
		const ud = userData[0];
		request(app)
			.post('/api/login')
			.send({ email: ud.email, password: ud.password })
			.then(response => {
				console.log(response.body.token);
				expect(response.body.success).toBe(true);
				expect(response.body.token).not.toBeNull;
				done();
			});
	});
	/* it('does return error if no token is provided', (done) => {
    request(app)
      .get('/api/users')
      .then((response) => {
        const body = response.text
        expect(body).toBe('{"error":true,"message":"Provide Token"}')
        done()
      })
  })*/
  
	it('show all courses in db', async function (done) {
		const jwt = await getJWT(userData[0]);
		request(app)
			.get('/api/users')
			.set('token', jwt)
			.then((response) => {
				const body = response.text;
				for (const user of users) {
					expect(body).toContain(user.name.first);
					expect(body).toContain(user.email);
				}
				done();
			});
	});
	it('explore json', async function (done) {
		const jwt = await getJWT(userData[1]);
		const allUsers = await User.find({});
		const numberOfUsers = allUsers.length;
		request(app)
			.get('/api/users')
			.set('token', jwt)
			.then((response) => {
				expect(response.body.data.users.length).toBeGreaterThanOrEqual(numberOfUsers);
				done();
			});
	});
});