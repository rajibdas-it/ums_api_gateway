/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('server running');
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    status: false,
    message: 'API not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  });
  next();
});

export default app;
