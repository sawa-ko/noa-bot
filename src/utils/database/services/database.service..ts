import { join } from 'path';
import * as lokijs from 'lokijs';

export class DatabaseService {
  public noaDb = new lokijs(join(__dirname, '../db/NoaBot.db'), {
    persistenceMethod: 'fs',
    autoload: true,
    autosave: true,
  });

  public init() {
    this.noaDb.addCollection('music', {
      indices: ['guild_id'],
      autoupdate: true,
    });
  }

  public getDb() {
    return this.noaDb;
  }

  public getCollection(name: string) {
    return this.noaDb.getCollection(name);
  }
}
