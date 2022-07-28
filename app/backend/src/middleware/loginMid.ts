import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interface/login.interface';

export default class loginMid {
  private validMethod = (method: string): boolean | void => {
    if (!method || typeof method !== 'string') {
      return true;
    }
  };

  public validLoginBody = async (req: Request, res: Response, next: NextFunction)
  : Promise<Response | void> => {
    const { email, password }: IUser = req.body;

    if (this.validMethod(email) || this.validMethod(password)) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }

    next();
  };
}
