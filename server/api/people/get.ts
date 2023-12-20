import db from '~/services/db';
import {PeopleDocument} from "~/types/documents/PeopleDocument";
import {WithId} from "mongodb";

export default defineEventHandler(async (event): Promise<WithId<PeopleDocument>[]> => {
  return await db.peopleCol
    .find({})
    .sort({index: 1})
    .toArray();
});
