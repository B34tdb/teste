import request from 'supertest';
import app from '../src/app';
import db from '../src/database';

describe('Overview', () => {
	let userId;

	beforeEach(async () => {
		const [firstId] = await db('users').insert({
			name: 'Ellie',
			email: 'ellie@gmail.com',
			password: 'joelmiller',
		});

		userId = firstId;
	});

	afterEach(async () => {
		await db('users').del();
		await db('transactions').del();
	});

	afterAll(async () => {
		db.destroy();
	});

	it('should return the correct data', async () => {
		await db('transactions').insert({
			coin: 'BTC',
			amount: 0.002,
			user_id: userId,
		});

		await db('transactions').insert({
			coin: 'BTC',
			amount: 0.002,
			user_id: userId,
		});

		await db('transactions').insert({
			coin: 'ADA',
			amount: 50,
			user_id: userId,
		});

		await db('transactions').insert({
			coin: 'ADA',
			amount: -25,
			user_id: userId,
		});

		await db('transactions').insert({
			coin: 'ETH',
			amount: 0.091,
			user_id: userId,
		});

		const response = await request(app)
			.get('/overview')
			.set('Authorization', userId);

		expect(response.body).toEqual({
			total: expect.any(Number),
			coins: expect.arrayContaining([
				expect.objectContaining({
					coin: 'BTC',
					total_amount: 0.004,
					price: expect.any(Number),
					total: expect.any(Number),
				}),
				expect.objectContaining({
					coin: 'ADA',
					total_amount: 25,
					price: expect.any(Number),
					total: expect.any(Number),
				}),
				expect.objectContaining({
					coin: 'ETH',
					total_amount: 0.091,
					price: expect.any(Number),
					total: expect.any(Number),
				}),
			]),
		});
	});
});
