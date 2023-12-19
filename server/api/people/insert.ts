import db from '~/services/db';
import {ObjectId} from "mongodb";
import type {People, PeopleDocument} from "~/types/documents/PeopleDocument";

type Request = People;

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Request;
  const result
      = await db.peopleCol.insertOne(body as PeopleDocument);
  const addList = await db.peopleCol
    .find({
      index: {$gte: body.index},
      _id: {$ne: new ObjectId(result.insertedId)}
    })
    .toArray();
  for (const doc of addList) {
    await db.peopleCol.updateOne(
        {_id: new ObjectId(doc._id)},
        {$set: {index: doc.index + 1}});
  }
  return result.insertedId;
});
