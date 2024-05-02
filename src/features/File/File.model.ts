import { Model, DataTypes, ModelAttributes } from "sequelize";
import User from "../User/models/User.model";

export default class File extends Model {
  declare id: number;
  declare path: string;
  declare filename: string;
  declare type: string;
  declare size: number;
  declare userId: number;
  declare user: User;
  declare updatedAt: Date;
  declare createdAt: Date;
}

export const FileScheme: ModelAttributes<File, any> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date()
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date()
  },
}
