import File from "../../File/File.model";
import { Model, DataTypes, ModelAttributes, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, BelongsToManyAddAssociationsMixin } from "sequelize";

export default class Product extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare Files: File[];
  declare sizes: string[];
  declare colors: string[];
  declare brand: string | null;
  declare gender: string[];
  declare categories: string[];
  declare price: number;
  declare updatedAt: Date;
  declare createdAt: Date;
  public setFiles!: BelongsToManySetAssociationsMixin<File, number>;
  public addFiles!: BelongsToManyAddAssociationsMixin<File, number>;
  public getFiles!: BelongsToManyGetAssociationsMixin<File>;
}

export const ProductScheme: ModelAttributes<Product, any> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sizes: {
    type: DataTypes.JSON,
    defaultValue: "[]",
  },
  colors: {
    type: DataTypes.JSON,
    defaultValue: "[]",
  },
  brand: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.JSON, 
    defaultValue: "[]",
  },
  categories: {
    type: DataTypes.JSON,
    defaultValue: "[]"
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(),
  },
};