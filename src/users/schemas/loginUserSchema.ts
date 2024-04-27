import { t } from 'elysia';

export const loginUserSchema = t.Object({
  email: t.String({
    format: 'email',
  }),
  password: t.String(),
});

export type TLoginUserSchema = typeof loginUserSchema;