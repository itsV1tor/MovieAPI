import 'express-async-errors';
import 'dotenv/config';

import express, { NextFunction, Response, Request } from 'express';
import routes from './routes';
import { AppError } from './utils/AppError';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(routes);
app.use((error: object, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
