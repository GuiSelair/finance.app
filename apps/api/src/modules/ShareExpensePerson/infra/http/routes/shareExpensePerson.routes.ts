import { Router } from 'express';

import { ensureAuthenticated } from '@infra/http/middlewares/ensureAuthenticated';
import { ShareExpensePersonController } from '../controllers/ShareExpensePersonController';

const shareExpensePersonRouter = Router();
const shareExpensePersonController = new ShareExpensePersonController();

shareExpensePersonRouter.use(ensureAuthenticated);

shareExpensePersonRouter.post('/', shareExpensePersonController.create);

export default shareExpensePersonRouter;
