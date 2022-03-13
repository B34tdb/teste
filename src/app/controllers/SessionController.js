import { celebrate, Segments, Joi } from 'celebrate';

import db from '../../database';
import AppError from '../errors/AppError';

class SessionController {
	async login({ data }) {
		const { email, password } = data;

		const user = await db('users').where({ email }).select().first();

		if (!user) {
			throw new AppError({ error: 'Usuário não encontrado', statusCode: 404 });
		}

		if (user.password !== password) {
			throw new AppError({ error: 'Não autorizado', statusCode: 401 });
		}

		delete user.password;
		return user;
	}
}

export const loginValidation = celebrate({
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});

export default new SessionController();
