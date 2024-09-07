import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import AppError from '@errors/AppError';
import routes from './routes';

import '../../Container';

const app = express();

/** Server configuration */
app.use(express.json());
app.use(cors());

/** Add routes */
app.use(routes);

/** Add error middleware */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

function startServer() {
  app.listen(3333, () => console.log('✅ HTTP Server: ON'));
}

export const httpServer = {
  start: startServer,
};
