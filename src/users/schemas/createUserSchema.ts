import { t } from 'elysia';

export const createUserSchema = t.Object({
  username: t.String({
    minLength: 8,
  }),
  email: t.String({
    format: 'email',
  }),
  password: t.String({
    minLength: 8,
  }),
})

export type TCreateUserSchema = typeof createUserSchema;