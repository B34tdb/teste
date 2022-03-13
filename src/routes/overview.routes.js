import { Router } from 'express';

import OverviewController from '../app/controllers/OverviewController';

const overviewRouter = Router();

overviewRouter.get('/', async (req, res) => {
	const userId = req.headers.authorization;

	const overview = await OverviewController.getOverview({ userId });

	return res.json(overview);
});

export default overviewRouter;
