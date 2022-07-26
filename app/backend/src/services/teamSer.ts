import { ITeam } from '../interface/team.interface';
import teams from '../database/models/teams';

export default class teamSer {
  public getAllTeams = async (): Promise<ITeam[]> => teams.findAll();

  public getOneTeam = async (id: number): Promise<ITeam | undefined> => {
    const team = await teams.findOne({ where: { id } });

    if (!team) {
      return undefined;
    }

    return team;
  };
}
