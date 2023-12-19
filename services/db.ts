import {Collection, Db, MongoClient} from "mongodb";
import type PeopleDocument from "~/types/documents/PeopleDocument";

class MongodbClient {
  #client: MongoClient | undefined;
  #db: Db | undefined;

  constructor(url: string, dbName: string) {
    this.#client = new MongoClient(url);
    this.#client.connect().then(client => {
      this.#db = client.db(dbName);
      console.log('mongodb connected');
    });
  }

  get accountCol() {
    return this.getCollection('account');
  }

  get peopleCol() {
    return this.getCollection<PeopleDocument>('people');
  }

  get attendanceCol() {
    return this.getCollection('attendance');
  }

  get recordCol() {
    return this.getCollection('record');
  }

  getCollection<T extends Document>(name: string): Collection<T> {
    if (!this.#db) throw new Error();
    return this.#db.collection<T>(name);
  }
}

const config = useRuntimeConfig();
const mongodbUrl = config.mongodbUrl;
const dbName = 'attendance-manage-web';
const db = new MongodbClient(mongodbUrl, dbName);

export default db;
