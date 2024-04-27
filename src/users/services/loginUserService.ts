import { error } from "elysia";
import bcrypt from 'bcryptjs';

import { TLoginUserSchema } from "../schemas/loginUserSchema"
import { findByEmail } from "./findByEmail";
import { sign } from "../../jwt";
import { db } from "../../db";

export const loginUserService = async ({ body } : {
  body: TLoginUserSchema
}) => {
  const { email, password } = body;

  try {
    const user = await findByEmail(email);

    if (!user) {
      return error(404, {
        message: 'User not found',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return error(401, {
        message: 'Incorrect password',
      })
    }

    const token = sign(user.id);

    const { password: _, ...restOfUser } = user;

    const userWithToken = {
      ...restOfUser,
      token,
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      }
    })

    return {
      status: 200,
      user: userWithToken,
      message: 'Logged in successfully',
    }
  } catch (e) {
    if (e instanceof Error) {
      return error(500, {
        message: e.message,
      })
    }

    return error(500, {
      message: 'An unknown error occurred',
    })
  }
}