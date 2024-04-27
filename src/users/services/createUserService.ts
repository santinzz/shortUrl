import { error } from 'elysia';
import bcrypt from 'bcryptjs';
import { TCreateUserSchema } from '../schemas/createUserSchema';
import { findByEmail } from './findByEmail';
import { db } from '../../db';

export const createUserService = async ({
  body,
}: {
  body: TCreateUserSchema;
}) => {
  const { username, password, email } = body;

  try {
    const user = await findByEmail(email);

    if (user) {
      return error(409, {
        message: 'Email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return error(500, {
        message: e.message,
      });
    }

    return error(500, {
      message: 'Unknown Error',
    });
  }

  return {
    message: 'User created successfully',
  };
};
