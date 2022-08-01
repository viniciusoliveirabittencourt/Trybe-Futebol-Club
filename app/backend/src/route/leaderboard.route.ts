import { Router } from 'express';
import LeaderboardCon from '../controller/leaderboardCon';

const leaderboardRoute = Router();
const leaderboardCon = new LeaderboardCon();

leaderboardRoute.get('/', leaderboardCon.leaderGeneral);
leaderboardRoute.get('/home', leaderboardCon.leaderHome);
leaderboardRoute.get('/away', leaderboardCon.leaderAway);

export default leaderboardRoute;
