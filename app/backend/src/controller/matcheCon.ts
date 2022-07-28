import { Request, Response } from 'express';
import { IMatche } from '../interface/matche.interface';
import MatcheSer from '../services/matcheSer';

export default class MatcheCon {
  constructor(private service = new MatcheSer()) {}

  public getMatches = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    let matcheImportant: IMatche[] | undefined;

    switch (inProgress) {
      case 'true': {
        matcheImportant = await this.service.progressMatches();
        break;
      }
      case 'false': {
        matcheImportant = await this.service.endMatches();
        break;
      }
      default: {
        matcheImportant = await this.service.allMatches();
        break;
      }
    }

    return res.status(200).send(matcheImportant);
  };

  public postMatche = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
    const returnTeam = await this.service.findTeams(homeTeam, awayTeam);

    if (!returnTeam) {
      return res.status(404).send({ message: 'There is no team with such id!' });
    }

    const newMatche = await this.service
      .createMatche(homeTeam, homeTeamGoals, awayTeam, awayTeamGoals);

    return res.status(201).send(newMatche);
  };

  public finishMatche = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.service.finishMatche(Number(id));

    return res.status(200).send({ message: 'Finished' });
  };

  public editMatche = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const returnEdit = await this.service.editMatche(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).send(returnEdit);
  };
}
