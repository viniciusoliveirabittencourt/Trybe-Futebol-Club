import { IMatche } from '../interface/matche.interface';
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

  private totalPointsAway = (atPoints: number, homeGoa: number, awayGoa: number): number => {
    let finalPoints = atPoints;
    if (homeGoa < awayGoa) {
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
    const calc = atPoint + 1;
    if (bool) {
      return homeGoa > awayGoa ? calc : atPoint;
    }
    return homeGoa < awayGoa ? calc : atPoint;
  };

  private sortArr = (arr: ILeaderboardPlaca[]): ILeaderboardPlaca[] => arr
    .sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);

  private calcEfficiency = (totalP: number, totalG: number): number => {
    const conta = (totalP / (totalG * 3)) * 100;
    return parseFloat(conta.toFixed(2));
  };

  private buildObjectTableHome = (acc: ILeaderboardPlaca, y: IMatche) => {
    acc.totalPoints = this
      .totalPointsHome(acc.totalPoints, y.homeTeamGoals, y.awayTeamGoals);
    acc.totalGames += 1;
    acc.totalVictories = this
      .totalVictoriesLosses(acc.totalVictories, true, y.homeTeamGoals, y.awayTeamGoals);
    acc.totalDraws = y.awayTeamGoals === y.homeTeamGoals
      ? acc.totalDraws += 1 : acc.totalDraws;
    acc.totalLosses = this
      .totalVictoriesLosses(acc.totalLosses, false, y.homeTeamGoals, y.awayTeamGoals);
    acc.goalsFavor += y.homeTeamGoals; acc.goalsOwn += y.awayTeamGoals;
    acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
    acc.efficiency = this.calcEfficiency(acc.totalPoints, acc.totalGames);
    return acc;
  };

  private buildObjectTableAway = (acc: ILeaderboardPlaca, y: IMatche) => {
    acc.totalPoints = this
      .totalPointsAway(acc.totalPoints, y.homeTeamGoals, y.awayTeamGoals);
    acc.totalGames += 1;
    acc.totalVictories = this
      .totalVictoriesLosses(acc.totalVictories, false, y.homeTeamGoals, y.awayTeamGoals);
    acc.totalDraws = y.awayTeamGoals === y.homeTeamGoals
      ? acc.totalDraws += 1 : acc.totalDraws;
    acc.totalLosses = this
      .totalVictoriesLosses(acc.totalLosses, true, y.homeTeamGoals, y.awayTeamGoals);
    acc.goalsFavor += y.awayTeamGoals; acc.goalsOwn += y.homeTeamGoals;
    acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
    acc.efficiency = this.calcEfficiency(acc.totalPoints, acc.totalGames);
    return acc;
  };

  private buildTableHome = (arr: IMatche[], teamName: string) => arr
    .reduce((acc, y): ILeaderboardPlaca => {
      const buildObject = this.buildObjectTableHome(acc, y);
      return buildObject;
    }, {
      name: teamName,
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

  private buildTableAway = (arr: IMatche[], teamName: string) => arr
    .reduce((acc, y): ILeaderboardPlaca => {
      const buildObject = this.buildObjectTableAway(acc, y);
      return buildObject;
    }, {
      name: teamName,
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

  private buildTableGeneral = (obj: ILeaderboardPlaca, objT: ILeaderboardPlaca)
  : ILeaderboardPlaca => {
    const someObject = {
      name: obj.name,
      totalPoints: obj.totalPoints + objT.totalPoints,
      totalGames: obj.totalGames + objT.totalGames,
      totalVictories: obj.totalVictories + objT.totalVictories,
      totalDraws: obj.totalDraws + objT.totalDraws,
      totalLosses: obj.totalLosses + objT.totalLosses,
      goalsFavor: obj.goalsFavor + objT.goalsFavor,
      goalsOwn: obj.goalsOwn + objT.goalsOwn,
    };

    const funcsObject = {
      goalsBalance: someObject.goalsFavor - someObject.goalsOwn,
      efficiency: this.calcEfficiency(someObject.totalPoints, someObject.totalGames),
    };

    return { ...someObject, ...funcsObject };
  };

  public leaderHome = async () => {
    const allTeam = await this.serviceTeam.getAllTeams();
    const allMatches = await this.serviceMatche.endMatches();
    const finalLeaderHome = allTeam.map((i) => {
      const allMatchesLeader = allMatches.filter((j) => j.homeTeam === i.id);
      return this.buildTableHome(allMatchesLeader, i.teamName);
    });

    return this.sortArr(finalLeaderHome);
  };

  public leaderAway = async () => {
    const allTeam = await this.serviceTeam.getAllTeams();
    const allMatches = await this.serviceMatche.endMatches();
    const finalLeaderAway = allTeam.map((i) => {
      const allMatchesLeader = allMatches.filter((j) => j.awayTeam === i.id);
      return this.buildTableAway(allMatchesLeader, i.teamName);
    });

    return this.sortArr(finalLeaderAway);
  };

  public leaderGeneral = async () => {
    const allTeam = await this.serviceTeam.getAllTeams();
    const allMatches = await this.serviceMatche.endMatches();
    const finalLeaderGeneral = allTeam.map((i) => {
      const allMatchesAway = allMatches.filter((j) => j.awayTeam === i.id);
      const allMatchesHome = allMatches.filter((j) => j.homeTeam === i.id);
      const tablesAway = this.buildTableAway(allMatchesAway, i.teamName);
      const tablesHome = this.buildTableHome(allMatchesHome, i.teamName);
      return this.buildTableGeneral(tablesHome, tablesAway);
    });

    return this.sortArr(finalLeaderGeneral);
  };
}
