import teams from "../database/models/teams";
import matches from "../database/models/matches";
import { IMatche } from "../interface/matche.interface";

export default class matcheSer {
  public allMatches = async (): Promise<IMatche[]> => {
    const allMatches = await matches.findAll({ include: [
      { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });

    return allMatches;
  };

  public endMatches = async (): Promise<IMatche[]> => {
    const allEndMatches = await matches.findAll({
      where: { inProgress: false },
      include: [
        { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ]
    });

    return allEndMatches;
  };

  public progressMatches = async (): Promise<IMatche[]> => {
    const allProgressMatches = await matches.findAll({
      where: { inProgress: true },
      include: [
        { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ]
    });

    return allProgressMatches;
  };
};
