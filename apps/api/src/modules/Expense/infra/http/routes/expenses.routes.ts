import { Router } from 'express';

import { ensureAuthenticated } from '@infra/http/middlewares/ensureAuthenticated';
import { ExpensesController } from '../controllers/ExpensesController';

const expensesRouter = Router();
const expensesController = new ExpensesController();

expensesRouter.use(ensureAuthenticated);

expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:id', expensesController.find);
expensesRouter.get('/list', expensesController.fetch);
expensesRouter.put('/:id/edit', expensesController.edit);
expensesRouter.delete('/:id', expensesController.delete);
expensesRouter.get('/balance', expensesController.balance);

export default expensesRouter;
