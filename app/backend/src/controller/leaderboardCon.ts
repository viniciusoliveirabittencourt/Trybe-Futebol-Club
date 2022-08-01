import { Response, Request } from 'express';
import LeaderboardSer from '../services/leaderboardSer';

export default class leaderboardCon {
  constructor(private leaderboardSer = new LeaderboardSer()) {}

  public leaderHome = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardHome = await this.leaderboardSer.leaderHome();

    return res.status(200).send(leaderboardHome);
  };

  public leaderAway = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardAway = await this.leaderboardSer.leaderAway();

    return res.status(200).send(leaderboardAway);
  };

  public leaderGeneral = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardGeneral = await this.leaderboardSer.leaderGeneral();

    return res.status(200).send(leaderboardGeneral);
  };
}
