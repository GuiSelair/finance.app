import { Router } from 'express';

import { ensureAuthenticated } from '@infra/http/middlewares/ensureAuthenticated';
import { ShareExpensePersonController } from '../controllers/ShareExpensePersonController';

const shareExpensePersonRouter = Router();
const shareExpensePersonController = new ShareExpensePersonController();

shareExpensePersonRouter.use(ensureAuthenticated);

shareExpensePersonRouter.post('/', shareExpensePersonController.create);
shareExpensePersonRouter.put('/:id', shareExpensePersonController.edit);
shareExpensePersonRouter.get('/', shareExpensePersonController.fetch);
shareExpensePersonRouter.get('/:id', shareExpensePersonController.find);

export default shareExpensePersonRouter;
