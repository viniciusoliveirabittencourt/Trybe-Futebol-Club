import { Router } from 'express';
import LoginCon from '../controller/loginCon';
import LoginMid from '../middleware/loginMid';

const LoginRoute = Router();
const loginCon = new LoginCon();
const loginMid = new LoginMid();

LoginRoute.post('/', loginMid.validLoginBody, loginCon.login.bind(loginCon));
LoginRoute.get('/validate', LoginMid.getRole, loginCon.loginValidate.bind(LoginCon));

export default LoginRoute;
