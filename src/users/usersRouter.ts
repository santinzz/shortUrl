import { Elysia } from 'elysia';
import { createUserService } from './services/createUserService';
import { createUserSchema } from './schemas/createUserSchema';
import { db } from '../db';
import { loginUserSchema } from './schemas/loginUserSchema';
import { loginUserService } from './services/loginUserService';

const router = new Elysia({ prefix: '/api/users' })
  .post('/register', createUserService, { body: createUserSchema })
  .post('/login', loginUserService, { body: loginUserSchema })
  .get('/', async () => {
    return await db.user.findMany();
  })

export default router;