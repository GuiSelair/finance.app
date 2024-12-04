import { Router } from 'express'

import { ensureAuthenticated } from '@infra/http/middlewares/ensureAuthenticated'
import { IncomesController } from '../controllers/IncomesController'

const incomesRouter = Router()
const incomesController = new IncomesController()

incomesRouter.use(ensureAuthenticated)
incomesRouter.post('/', incomesController.createUpdate)
incomesRouter.get('/', incomesController.find)

export default incomesRouter
