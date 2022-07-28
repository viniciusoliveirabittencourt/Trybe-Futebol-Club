import { Router } from 'express';
import LeaderboardCon from '../controller/leaderboardCon';

const leaderboardRoute = Router();
const leaderboardCon = new LeaderboardCon();

leaderboardRoute.get('/home', leaderboardCon.leaderHome);

export default leaderboardRoute;
