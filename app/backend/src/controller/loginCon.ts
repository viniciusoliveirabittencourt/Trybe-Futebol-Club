import { Request, Response } from 'express';
import LoginSer from '../services/loginSer';
import { IBodyLogin } from '../interface/login.interface';

export default class loginCon {
  constructor(private service = new LoginSer()) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password }: IBodyLogin = req.body;

    const verifyLogin = await this.service.canLogin(email, password);

    if (!verifyLogin.message) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }

    return res.status(200).send({ token: verifyLogin.message });
  };

  public loginValidate = async (req: Request, res: Response): Promise<Response> => {
    const { user } = req.headers;

    return res.status(200).send({ role: user });
  };
}
