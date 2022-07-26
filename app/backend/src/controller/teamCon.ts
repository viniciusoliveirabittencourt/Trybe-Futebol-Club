import { Response, Request } from 'express';
import TeamSer from '../services/teamSer';

export default class teamCon {
  constructor(private service = new TeamSer()) {}

  public getTeams = async (_req: Request, res: Response)
  : Promise<Response> => {
    const returnAllTeams = await this.service.getAllTeams();

    return res.status(200).send(returnAllTeams);
  };

  public getIdTeam = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const team = await this.service.getOneTeam(parseInt(id));

    return res.status(200).send(team);
  };
}
