import request from 'supertest';
import app from '../src/app';
import db from '../src/database';

describe('Sessions', () => {
	beforeAll(async () => {
		await db('users').insert({
			name: 'Ellie',
			email: 'ellie@gmail.com',
			password: 'joelmiller',
		});
	});

	afterAll(async () => {
		await db('users').del();
		db.destroy();
	});

	it('should be able to login successfully when email and password are correct', async () => {
		const response = await request(app)
			.post('/session/login')
			.send({ email: 'ellie@gmail.com', password: 'joelmiller' });

		expect(response.statusCode).toBe(200);
		expect(response.body).toMatchObject({
			name: 'Ellie',
			email: 'ellie@gmail.com',
		});
		expect(response.body).not.toHaveProperty('password');
	});

	it('should not be able to login with an incorrect password', async () => {
		const response = await request(app)
			.post('/session/login')
			.send({ email: 'ellie@gmail.com', password: 'incorrectpassword' });

		expect(response.statusCode).toBe(401);
	});

	it('should not be able to login with an unregistered email address', async () => {
		const response = await request(app)
			.post('/session/login')
			.send({ email: 'unregistered@gmail.com', password: 'whatever' });

		expect(response.statusCode).toBe(404);
	});

	it('should return an error when email is not provided', async () => {
		const response = await request(app)
			.post('/session/login')
			.send({ password: 'whatever' });

		expect(response.statusCode).toBe(400);
	});

	it('should return an error when password is not provided', async () => {
		const response = await request(app)
			.post('/session/login')
			.send({ email: 'whatever@gmail.com' });

		expect(response.statusCode).toBe(400);
	});
});
