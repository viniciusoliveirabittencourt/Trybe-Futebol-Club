import * as JWT from 'jsonwebtoken';
import { IUser } from '../interface/login.interface';

const secretPass = process.env.JWT_SECRET || 'newSecretNotUsed';
const jwtOptions: JWT.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (user: IUser): string => {
  console.log(secretPass);
  return JWT
    .sign({ data: user }, secretPass, jwtOptions);
};

const readJwt = (jwtToke: string)
: string | JWT.JwtPayload | undefined => {
  try {
    return JWT.verify(jwtToke, secretPass);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export default {
  createToken,
  readJwt,
};
