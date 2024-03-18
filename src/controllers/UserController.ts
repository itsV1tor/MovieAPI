import { Request, Response } from "express";
import { knex } from "../database/knex";
import { AppError } from "../utils/AppError";
import { hash, compare } from "bcryptjs";

interface UserData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  avatar: string;
}

interface UserDatabaseType {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, avatar }: UserData = request.body;
    function isEmailValid(email: string): boolean {
      const rgx = /\S+@\S+\.\S+/;
      return rgx.test(email);
    }

    function isPasswordValid(password: string): boolean {
      const rgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return rgx.test(password);
    }

    if (!name || !email || !password) {
      throw new AppError("You must enter all the data to create an account.");
    }

    if (!isEmailValid(email)) {
      throw new AppError("The email is not valid.");
    }

    if (!isPasswordValid(password)) {
      throw new AppError("The password is not valid.");
    }

    const emailAlreadyExists = await knex("users")
      .select("*")
      .where({ email })
      .first();

    if (emailAlreadyExists) {
      throw new AppError("Email already exists.");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      avatar: avatar || null,
    });

    return response.status(201).json({
      status: "success",
      message: "User created!",
    });
  }

  async update(request: Request, response: Response) {
    const { name, email, password, old_password }: UserData = request.body;
    const { id } = request.params;

    const user: UserDatabaseType = await knex("users")
      .select("*")
      .where({ id })
      .first();

    if (!user) {
      throw new AppError("User does not exist.");
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users")
        .select("*")
        .where({ email })
        .first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id != id) {
        throw new AppError("E-mail already in use.");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Old password is mandatory.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old Password is invalid.");
      }
      /*if(checkOldPassword) {
        throw new AppError("Old password is equal new password.")
      }*/
      user.password = await hash(password, 8);
    }

    await knex("users")
      .update({ name, email, password, updated_at: knex.fn.now() })
      .where({ id });

    response.status(202).json({
      status: "success",
      message: "User are updated",
    });
  }
}
