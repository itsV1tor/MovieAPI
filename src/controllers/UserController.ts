import { Request, Response } from 'express';
import { knex } from '../database/knex';
import { AppError } from '../utils/AppError';

interface UserData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, avatar }: UserData = request.body;

    function isEmailValid(email: string): boolean {
      const rgx = /\S+@\S+\.\S+/;
      return rgx.test(email);
    }
    
    function isPasswordValid(password: string): boolean{
      const rgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return rgx.test(password);
    }

    const emailAlreadyExists = await knex('users').select('*').where({ email });
    
    if (!name || !email || !password) {
      throw new AppError('You must enter all the data to create an account.');
    }

    if (!isEmailValid(email)) {
      throw new AppError('The email is not valid.');
    }

    if(!isPasswordValid(password)){
      throw new AppError('The password is not valid.');
    }

    if (emailAlreadyExists) {
      throw new AppError('Email already exists.');
    }

    await knex('users').insert({ name, email, password, avatar: avatar || null });

    return response.status(201).json({
      status: 'success',
      message: 'User created!',
    });
  }
}
