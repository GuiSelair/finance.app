import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '../../errors/AppError';
import routes from './routes';
import '../typeorm';
import '../../Container';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(routes);

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

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('🚀 Server ON: http://localhost:3333 🚀'));
