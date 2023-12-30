import db from '~/services/db';
import {Record} from "~/types/documents/RecordDocument";

interface Request {
    record: Record;
}

export default defineEventHandler(async (event) => {
    const {record} = await readBody(event) as Request
    const result = await db.recordCol
        .insertOne(record as any);
    return result.insertedId;
});
