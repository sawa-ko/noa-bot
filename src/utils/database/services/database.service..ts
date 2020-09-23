import { join } from 'path';
import * as lokijs from 'lokijs';

export class DatabaseService {
  public static noaDb = new lokijs(join(__dirname, '../db/NoaBot.db'), {
    persistenceMethod: 'fs',
    autoload: true,
    autosave: true,
    autosaveInterval: 2000,
  });

  public init() {
    DatabaseService.noaDb.removeCollection('music');
    setTimeout(() => {
      DatabaseService.noaDb.addCollection('music', {
        indices: ['guild_id'],
        autoupdate: true,
      });
    }, 2000);

    DatabaseService.noaDb.saveDatabase();
  }

  public getDb() {
    return DatabaseService.noaDb;
  }

  public getCollection(name: string) {
    return DatabaseService.noaDb.getCollection(name);
  }
}
