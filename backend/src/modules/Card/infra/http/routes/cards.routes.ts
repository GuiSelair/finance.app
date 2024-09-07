import { Router } from 'express';

import { ensureAuthenticated } from '@infra/http/middlewares/ensureAuthenticated';
import { CardsController } from '../controllers/CardsController';

const cardsRoutes = Router();
const cardsController = new CardsController();

/** Add auth middleware */
cardsRoutes.use(ensureAuthenticated);

cardsRoutes.post('/', cardsController.create);
cardsRoutes.get('/totalizers', cardsController.getTotalizers);
cardsRoutes.get('/list', cardsController.show);

export default cardsRoutes;
