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

  async read(request: Request, response: Response) {
    const { user_id } = request.params;

    const user = await knex('users').select('*').where('id', '=', user_id).first();

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const movies = await knex('movies').select('*').where({ user_id });

    response.status(200).json({
      status: 'success',
      message: 'Movies successfully rescued.',
      movies,
    });
  }

  async update(request: Request, response: Response) {
    const { title, description, raiting }: MovieDataType = request.body;
    const { user_id, movie_id } = request.params;

    const user = await knex('users').select('*').where('id', '=', user_id).first();

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const movie = await knex('movies')
      .select('*')
      .where('id', '=', movie_id)
      .where('user_id', '=', user.id)
      .first();

    console.log(movie);

    if (!movie) {
      throw new AppError('Movie does not exist.');
    }

    await knex('movies')
      .update({
        title,
        description,
        raiting,
        updated_at: knex.fn.now(),
      })
      .where('id', '=', movie.id);

    response.status(200).json({
      status: 'success',
      message: 'Movie is updated.',
    });
  }

  async show(request: Request, response: Response) {
    const { user_id, movie_id } = request.params;

    const user = await knex('users').select('*').where('id', '=', user_id).first();

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const movie = await knex('movies')
      .select('*')
      .where('id', '=', movie_id)
      .where('user_id', '=', user.id)
      .first();

    if (!movie) {
      throw new AppError('Movie does not exist');
    }

    response.status(200).json({
      status: 'success',
      message: 'Movies successfully rescued.',
      movie,
    });
  }

  async delete(request: Request, response: Response) {
    const { user_id, movie_id } = request.params;

    const user = await knex('users').select('*').where('id', '=', user_id).first();

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const movie = await knex('movies')
      .select('*')
      .where('id', '=', movie_id)
      .where('user_id', '=', user.id)
      .first();

    if (!movie) {
      throw new AppError('movie does not exists');
    }

    await knex('movies').delete().where('id', '=', movie.id);

    response.status(200).json({
      status: 'success',
      message: 'Movie is deleted',
    });
  }
}
