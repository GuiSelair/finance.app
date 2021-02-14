import { Router } from 'express';
import ensureAuthenticated from '../../../../User/infra/http/middlewares/ensureAuthenticated';

import CardController from '../controllers/CardsController';

const cardsRoutes = Router();

cardsRoutes.use(ensureAuthenticated);

const cardsController = new CardController();

cardsRoutes.post('/', cardsController.create);

export default cardsRoutes;
