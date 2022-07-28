import { Response, Request } from 'express';
import LeaderboardSer from '../services/leaderboardSer';

export default class leaderboardCon {
  constructor(private leaderboardSer = new LeaderboardSer()) {}

  public leaderHome = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardHome = this.leaderboardSer.leaderHome();

    return res.status(200).send(leaderboardHome);
  };
}
