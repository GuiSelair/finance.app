import { Router } from 'express';

import usersRoutes from '../../../../modules/User/infra/http/routes/users.routes';
import sessionsRoutes from '../../../../modules/User/infra/http/routes/sessions.routes';
import cardsRoutes from '../../../../modules/Card/infra/http/routes/cards.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/login', sessionsRoutes);
routes.use('/cards', cardsRoutes);

export default routes;
