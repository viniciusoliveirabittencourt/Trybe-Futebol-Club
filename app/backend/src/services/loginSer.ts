import { compareSync } from 'bcryptjs';
import { IResponseService, IUser } from '../interface/login.interface';
import users from '../database/models/users';
import JWT from '../utils/JWT';

export default class loginSer {
  public canLogin = async (email: string, password: string): Promise<IResponseService> => {
    const user: IUser | null = await users.findOne({ where: { email } });

    if (!user) {
      return { message: undefined };
    }

    const newUser: IUser = {
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };

    if (!compareSync(password, user.password)) {
      return { message: undefined };
    }

    return { message: JWT.createToken(newUser) };
  };
}
