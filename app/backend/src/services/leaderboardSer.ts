import { ILeaderboardPlaca } from '../interface/leaderboard.interface';
import MatcheSer from './matcheSer';
import TeamSer from './teamSer';

export default class leaderboardSer {
  constructor(
    private serviceMatche = new MatcheSer(),
    private serviceTeam = new TeamSer(),
  ) {}

  private totalPointsHome = (atPoints: number, homeGoa: number, awayGoa: number): number => {
    let finalPoints = atPoints;
    if (homeGoa > awayGoa) {
      finalPoints += 3;
    } else if (homeGoa === awayGoa) {
      finalPoints += 1;
    }
    return finalPoints;
  };

  private totalVictoriesLosses = (
    atPoint: number,
    bool: boolean,
    homeGoa: number,
    awayGoa: number,
  ): number => {
    if (bool) {
      return homeGoa > awayGoa ? atPoint += 1 : atPoint;
    }
    return homeGoa < awayGoa ? atPoint += 1 : atPoint;
  };

  private sortArr = (arr: ILeaderboardPlaca[]): ILeaderboardPlaca[] => arr
    .sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);

  private buildPlacar = (arr) => {

  }

  public leaderHome = async () => {
    const allTeam = await this.serviceTeam.getAllTeams();
    const allMatches = await this.serviceMatche.endMatches();
    const finalLeaderHome = allTeam.map((i) => {
      const allMatchesLeader = allMatches.filter((j) => j.homeTeam === i.id);
      return allMatchesLeader.reduce((x, y): ILeaderboardPlaca => {
        x.name = i.teamName;
        x.totalPoints = this
          .totalPointsHome(x.totalPoints, y.homeTeamGoals, y.awayTeamGoals);
        x.totalGames += 1;
        x.totalVictories = this
          .totalVictoriesLosses(x.totalVictories, true, y.homeTeamGoals, y.awayTeamGoals);
        x.totalDraws = y.awayTeamGoals === y.homeTeamGoals
          ? x.totalDraws += 1 : x.totalDraws;
        x.totalLosses = this
          .totalVictoriesLosses(x.totalLosses, false, y.homeTeamGoals, y.awayTeamGoals);
        x.goalsFavor += y.homeTeamGoals;
        x.goalsOwn += y.awayTeamGoals;
        x.goalsBalance = x.goalsFavor - x.goalsOwn;
        x.efficiency = (x.totalPoints / (x.totalGames * 3)) * 100;
        return x;
      }, {
        name: '',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      });
    });

    return this.sortArr(finalLeaderHome);
  };
}
