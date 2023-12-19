import db from '~/services/db';
import type {status} from "~/types/documents/ConfigDocument";

export default defineEventHandler(async (event): Promise<status[]> => {
    const configDoc
        = await db.configCol.findOne({type: "statusList"});
    return configDoc?.config ?? [{
        key: "default",
        name: "預設",
    }];
});
