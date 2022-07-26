export interface IBodyLogin {
  email: string;
  password: string;
}

export interface IResponseService {
  message: undefined | string;
}

export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
