import { Elysia } from "elysia";

import urlsRouter from './urls/urlsRouter';
import usersRouter from './users/usersRouter';
import { getUrlService } from "./urls/services/getUrl";

new Elysia()
  .get('/:tinyUrl', getUrlService)
  .derive(({ headers }) => {
    const auth = headers['authorization'];

    return {
      token: auth?.startsWith('Bearer ') ? auth.slice(7) : null
    }
  })
  .use(urlsRouter)
  .use(usersRouter)
  .listen(3000, () => {
    console.log('Server is running on port 3000');
  })