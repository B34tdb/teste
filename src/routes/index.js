import { Router } from 'express';

import sessionRouter from './session.routes';
import overviewRouter from './overview.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/overview', overviewRouter);

export default routes;
