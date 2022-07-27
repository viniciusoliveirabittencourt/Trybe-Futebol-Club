import { Router } from 'express';
import MatcheCon from '../controller/matcheCon';

const MatchesRoute = Router();
const matcheCon = new MatcheCon();

MatchesRoute.get('/', matcheCon.getMatches);

export default MatchesRoute;
