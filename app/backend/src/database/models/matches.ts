import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import teams from './teams';

class matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

matches.belongsTo(teams, { foreignKey: 'homeTeam', as: 'teamHome' });
matches.belongsTo(teams, { foreignKey: 'awayTeam', as: 'teamAway' });

teams.hasMany(matches, { foreignKey: 'homeTeam', as: 'teamHome' });
teams.hasMany(matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default matches;
