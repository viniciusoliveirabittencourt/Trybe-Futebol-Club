import teams from '../database/models/teams';
import matches from '../database/models/matches';
import { IMatche } from '../interface/matche.interface';
import TeamSer from './teamSer';

export default class matcheSer {
  constructor(private teamServ = new TeamSer()) {}

  public allMatches = async (): Promise<IMatche[]> => matches.findAll({ include: [
    { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
    { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
  ] });

  public endMatches = async (): Promise<IMatche[]> => matches.findAll({
    where: { inProgress: false },
    include: [
      { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  public progressMatches = async (): Promise<IMatche[]> => matches.findAll({
    where: { inProgress: true },
    include: [
      { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  public createMatche = async (
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
  ): Promise<IMatche> => matches.create({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress: true,
  });

  public finishMatche = async (id: number): Promise<void> => {
    await matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public findTeams = async (home: number, away: number): Promise<boolean | undefined> => {
    const teamHome = await this.teamServ.getOneTeam(home);
    const teamAway = await this.teamServ.getOneTeam(away);

    if (!teamHome || !teamAway) {
      return undefined;
    }

    return true;
  };

  public editMatche = async (id: number, homeTeamGoals: number, awayTeamGoals: number)
  : Promise<[number, matches[]]> => matches.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );
}
