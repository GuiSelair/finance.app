import { Router } from 'express'

import { ensureAuthenticated } from '@infra/http/middlewares/ensureAuthenticated'

const incomesRouter = Router()

incomesRouter.use(ensureAuthenticated)
incomesRouter.post('/')

export default incomesRouter
