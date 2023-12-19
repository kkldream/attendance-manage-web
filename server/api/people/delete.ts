import db from '~/services/db';
import {ObjectId} from "mongodb";

interface Request {
    peopleId: string;
}

export default defineEventHandler(async (event): Promise<Boolean> => {
    const body = await readBody(event) as Request;
    const index = (await db.peopleCol
        .findOne({_id: new ObjectId(body.peopleId)}))?.index ?? 0;
    const result = await db.peopleCol
        .deleteMany({_id: new ObjectId(body.peopleId)});
    const addList = await db.peopleCol
        .find({
            index: {$gte: index}
        })
        .toArray();
    for (const doc of addList) {
        await db.peopleCol.updateOne(
            {_id: new ObjectId(doc._id)},
            {$set: {index: doc.index - 1}});
    }
    return result.deletedCount > 0;
});
