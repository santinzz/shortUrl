import jwt from 'jsonwebtoken';

interface TokenVerify {
  data: string;
  iat: number;
  exp: number;
}

export const sign = (payload: string) => {
  return jwt.sign({ 
    data: payload
   }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })
}

export const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenVerify;
}