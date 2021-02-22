import { Router } from 'express';

import usersRoutes from '../../../../modules/User/infra/http/routes/users.routes';
import sessionsRoutes from '../../../../modules/User/infra/http/routes/sessions.routes';
import cardsRoutes from '../../../../modules/Card/infra/http/routes/cards.routes';
import expensesRoutes from '../../../../modules/Expense/infra/http/routes/expenses.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/login', sessionsRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/expenses', expensesRoutes);

export default routes;
