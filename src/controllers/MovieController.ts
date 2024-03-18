import { Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { knex } from '../database/knex';

interface MovieDataType {
  title: string;
  description: string;
  raiting: number;
}

export class MovieController {
  async create(request: Request, response: Response) {
    const { title, description, raiting }: MovieDataType = request.body;
    const { user_id } = request.params;

    const user = await knex('users').select('*').where('id', '=', user_id).first();

    if (!user) {
      throw new AppError('User does not exist.');
    }

    if (!title || !description || !raiting) {
      throw new AppError('All data is mandatory!');
    }

    await knex('movies').insert({ title, description, raiting, user_id: user.id });

    response.status(201).json({
      status: 'success',
      message: 'Your movie is registered.',
    });
  }
}
