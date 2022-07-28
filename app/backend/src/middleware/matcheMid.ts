import { Request, Response, NextFunction } from 'express';

const cantPostIgualTeams = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).send({ message:
      'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default {
  cantPostIgualTeams,
};
