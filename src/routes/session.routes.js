import { Router } from 'express';

import SessionController, {
	loginValidation,
} from '../app/controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post('/login', loginValidation, async (req, res) => {
	const data = req.body;

	const user = await SessionController.login({ data });

	return res.json(user);
});

export default sessionRouter;
