import { Request, Response } from 'express';
import { IMatche } from '../interface/matche.interface';
import MatcheSer from '../services/matcheSer';

export default class MatcheCon {
  constructor (private service = new MatcheSer()) {}

  public getMatches = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    let matcheImportant: IMatche[] | undefined;
    console.log(inProgress === 'true');

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
    };

    return res.status(200).send(matcheImportant);
  };
};
