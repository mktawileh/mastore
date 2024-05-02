import DatabaseService from "./database/database.service";
import SeedService from "./database/seed.service";
import ServerService from "./server/server.service";

export default class RootService {
  database: DatabaseService = new DatabaseService();
  server: ServerService = new ServerService();
  seeder: SeedService = new SeedService();

  constructor() {
    this.database.initModels();
  }

  async go() {
    const args = process.argv.slice(2);

    await this.database.connect();
    await this.database.syncModels();
    this.database.initRelations();
    if (args[0] === 'seed') {
      this.seeder.run();
    } else {
      this.server.init();
      this.server.run();
    }
  }
}