import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import { captureErrors } from './middlewares/captureErrors';

const app = express();

/** Server configuration */
app.use(express.json());
app.use(cors());

/** Add routes */
app.use(routes);

/** Add error middleware */
app.use(captureErrors);

function startServer() {
  app.listen(3333, () => console.log('✅ HTTP Server: ON'));
}

export const httpServer = {
  start: startServer,
};
