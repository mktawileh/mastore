import { Sequelize } from "sequelize";
import User, { UserScheme } from "../features/User/models/User.model";

export default class DatabaseService {
  sequelize: Sequelize;
  path: string = 'db/database.sqlite';

  constructor () {
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DATABASE_PATH ?? this.path
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
    User.init(UserScheme, { sequelize: this.sequelize });
  }

  async syncModels() {
    await User.sync();
  }
}