import { Model, DataTypes, ModelAttributes } from "sequelize";
import jwt from "jsonwebtoken";

export default class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;

  createToken(): string {
    return jwt.sign({id: this.id}, process.env.SECRET || "secret");
  }
}

export const UserScheme: ModelAttributes<User, any> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date()
  }
}
