import DatabaseService from "./database/database.service";
import ServerService from "./server/server.service";

export default class RootService {
  database: DatabaseService = new DatabaseService();
  server: ServerService = new ServerService();

  constructor() {
    this.database.initModels();
  }

  async go() {
    await this.database.connect();
    await this.database.syncModels();

    this.server.init();
    this.server.run();
  }
}