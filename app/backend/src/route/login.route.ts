import { Router } from 'express';
import utilsMid from '../middleware/utilsMid';
import LoginCon from '../controller/loginCon';
import LoginMid from '../middleware/loginMid';

const LoginRoute = Router();
const loginCon = new LoginCon();
const loginMid = new LoginMid();

LoginRoute.post('/', loginMid.validLoginBody, loginCon.login.bind(loginCon));
LoginRoute.get('/validate', utilsMid.validToke, loginCon.loginValidate.bind(LoginCon));

export default LoginRoute;
