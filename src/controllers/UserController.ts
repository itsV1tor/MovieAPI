import { Request, Response } from 'express';
import { AppError } from '../utils/AppError';

export class UserController {
  create(request: Request, response: Response) {
    const { name, email, password, avatar } = request.body;
    console.log(name, email, password, avatar);
  }
}
