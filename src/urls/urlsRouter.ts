import { Elysia } from 'elysia';
import { createUrlService } from './services/createUrl';
import { createUrlSchema } from './schemas/createUrlSchema';
import { getUrlsService } from './services/getUrls';
import { deleteUrlService } from './services/deleteUrl';

const router = new Elysia({ prefix: '/api/urls' })
  .get('/', getUrlsService)
  .post('/', createUrlService, { body: createUrlSchema })
  .delete('/:id', deleteUrlService)

export default router;