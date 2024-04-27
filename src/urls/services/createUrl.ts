import { error } from 'elysia';
import { db } from '../../db';
import { CreateUrlSchema } from '../schemas/createUrlSchema';
import { findByTinyUrl } from './findByTinyUrl';
import { verify } from '../../jwt';

interface CreateUrlServiceParams {
  body: CreateUrlSchema;
  token: string;
}

interface TokenVerify {
  data: string;
  iat: number;
  exp: number;
}

export const createUrlService = async ({ body, token }: CreateUrlServiceParams) => {
  const { url, alias } = body;

  const tinyUrl = alias || Math.random().toString(36).substring(8);
  
  
  try {
    const urlExists = await findByTinyUrl(tinyUrl);
    
    if (urlExists) {
      error(409, {
        message: 'Alias already exists'
      })
    }
    
    const { data } = verify(token) as TokenVerify;

    await db.url.create({
      data: {
        url,
        tinyUrl,
        userId: data
      }
    });

  } catch (e) {
    if (e instanceof Error) {
      return error(500, {
        message: e.message
      })
    }

    return error(500, {
      message: 'Unknown Error'
    })
  }

  return {
    message: 'Url created successfully'
  };
};
