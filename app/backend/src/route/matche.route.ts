import { Router } from 'express';
import utilsMid from '../middleware/utilsMid';
import MatcheCon from '../controller/matcheCon';
import matcheMid from '../middleware/matcheMid';

const MatchesRoute = Router();
const matcheCon = new MatcheCon();

MatchesRoute.get('/', matcheCon.getMatches.bind(matcheCon));
MatchesRoute.post('/', utilsMid.validToke, matcheMid.cantPostIgualTeams, matcheCon.postMatche.bind(matcheCon));
MatchesRoute.patch('/:id/finish', utilsMid.validToke, matcheCon.finishMatche.bind(matcheCon));
MatchesRoute.patch('/:id', matcheCon.editMatche.bind(matcheCon));

export default MatchesRoute;
