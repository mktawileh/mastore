import { Model, DataTypes, ModelAttributes } from "sequelize";

export default class Metadata extends Model {
  declare id: number;
  declare typename: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const MetadataScheme: ModelAttributes<Metadata, any> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  typename: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
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
