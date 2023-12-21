import {Collection, Db, MongoClient} from "mongodb";
import type {PeopleDocument} from "~/types/documents/PeopleDocument";
import type {TemplateDocument} from "~/types/documents/TemplateDocument";
import type {AccountDocument} from "~/types/documents/AccountDocument";
import type {RecordDocument} from "~/types/documents/RecordDocument";
import type {ConfigDocument} from "~/types/documents/ConfigDocument";

class MongodbClient {
    #client: MongoClient | undefined;
    #db: Db | undefined;

    constructor(url: string, dbName: string) {
        this.#client = new MongoClient(url);
        console.log(`mongodb connecting to ${url}`);
        this.#client.connect().then(client => {
            this.#db = client.db(dbName);
            console.log('mongodb connected');
        });
    }

    get accountCol() {
        return this.getCollection<AccountDocument>('account');
    }

    get peopleCol() {
        return this.getCollection<PeopleDocument>('people');
    }

    get configCol() {
        return this.getCollection<ConfigDocument>('config');
    }

    get recordCol() {
        return this.getCollection<RecordDocument>('record');
    }

    get templateCol() {
        return this.getCollection<TemplateDocument>('template');
    }

    getCollection<T extends Document>(name: string): Collection<T> {
        if (!this.#db) throw new Error("getCollection");
        return this.#db.collection<T>(name);
    }
}

// TODO 優化server side取環境變數方法
// const config = useRuntimeConfig();
// const mongodbUrl = config.mongodbUrl;
const mongodbUrl = (process.env.MONGODB_URL || "mongodb://localhost:27017").trim();
console.log(`mongodb url: ${mongodbUrl}`);
const dbName = 'attendance-manage-web';
const db = new MongodbClient(mongodbUrl, dbName);

export default db;
