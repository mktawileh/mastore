import { Sequelize } from "sequelize";
import User, { UserScheme } from "../features/User/models/User.model";
import File, { FileScheme } from "../features/File/File.model";
import Product, { ProductScheme } from "../features/Product/models/Product.model";
import ProductFile, { ProductFileScheme } from "../features/Product/models/ProductFiles.model";

export default class DatabaseService {
  sequelize: Sequelize;
  path: string = 'db/database.sqlite';

  constructor () {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DATABASE_PATH ?? this.path,
      logging: false
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  initModels() {
    User.init(UserScheme, { sequelize: this.sequelize, paranoid: true });
    File.init(FileScheme, { sequelize: this.sequelize, paranoid: true });
    Product.init(ProductScheme, { sequelize: this.sequelize, paranoid: true });
    ProductFile.init(ProductFileScheme, { sequelize: this.sequelize, paranoid: true });
  }

  async syncModels() {
    await User.sync();
    await File.sync();
    await Product.sync();
    await ProductFile.sync();
  }

  initRelations() {
    File.belongsTo(User);
    User.hasMany(File, {
      foreignKey: 'userId'
    });
    Product.belongsToMany(File, { through: 'ProductFile', foreignKey: "productId" });
    File.belongsToMany(Product, { through: 'ProductFile', foreignKey: "fileId" });
  }
}