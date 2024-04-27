import { t } from 'elysia';

export const createUrlSchema = t.Object({
  alias: t.Optional(t.String({
    minLength: 3,
  })),
  url: t.String({
    format: 'uri'
  }),
});

export type CreateUrlSchema = typeof createUrlSchema;