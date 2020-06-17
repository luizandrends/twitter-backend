import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
// app.use(
//   '/users/avatar',
//   express.static(
//     path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads')
//   )
// );
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333);
