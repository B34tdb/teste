import AppError from '../errors/AppError';

export default async (err, req, res, next) => {
	if (err instanceof AppError) {
		const { error, statusCode } = err;

		return res.status(statusCode).json({ error });
	}

	// eslint-disable-next-line no-console
	console.log(err);

	return res.status(500).json({ error: 'Internal Server Error' });
};
