import { Router } from 'express';

import LoginController from '../controllers/LoginController';

const sessionRouter = Router();

const loginController = new LoginController();

sessionRouter.post('/', loginController.create);

export default sessionRouter;
