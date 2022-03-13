import db from '../../database';
import AppError from '../errors/AppError';

class OverviewController {
	async getOverview({ userId }) {
		if (!userId) {
			throw new AppError({ error: 'Não autorizado', statusCode: 401 });
		}

		let total = 0;

		let coins = await db('transactions')
			.sum('amount as total_amount')
			.select('coin')
			.where({ user_id: userId })
			.groupBy('coin');

		coins = coins.map((coin) => {
			coin.price = Math.random() * 10000; // Let's use some random values to simulate price fluctuation
			coin.total = coin.price * coin.total_amount;
			total += coin.total;
			return coin;
		});

		return { total, coins };
	}
}

export default new OverviewController();
