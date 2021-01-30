import { Router } from 'express';

import usersRoutes from '../../../../modules/User/infra/http/routes/users.routes';
import sessionsRoutes from '../../../../modules/User/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/login', sessionsRoutes);

export default routes;
