import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class users extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

users.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default users;
