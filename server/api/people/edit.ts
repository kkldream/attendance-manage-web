import db from '~/services/db';
import {ObjectId} from "mongodb";

interface Request {
    peopleId: string;
    data: {
        name: string;
        direction: string;
        email: string;
    };
}

export default defineEventHandler(async (event): Promise<boolean> => {
    const body = await readBody(event) as Request;
    const result = await db.peopleCol.updateOne(
        {_id: new ObjectId(body.peopleId)},
        {
            $set: {
                name: body.data.name,
                direction: body.data.direction,
                email: body.data.email,
            }
        });
    return result.upsertedCount > 0;
});
