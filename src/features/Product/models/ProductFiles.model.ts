import { Model, DataTypes, ModelAttributes } from "sequelize";
import Product from "./Product.model";
import File from "../../File/File.model";

export default class ProductFile extends Model {
  declare id: number;
  declare product: Product;
  declare file: File;
  declare productId: number;
  declare fileId: number;
  declare updatedAt: Date;
  declare createdAt: Date;
}

export const ProductFileScheme: ModelAttributes<ProductFile, any> = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  fileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: File,
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
