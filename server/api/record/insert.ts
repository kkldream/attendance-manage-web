import db from '~/services/db';
import {Template} from "~/types/documents/TemplateDocument";
import {Record} from "~/types/documents/RecordDocument";

type Request = Record;

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Request
  const result = await db.recordCol
    .insertOne(body as any);
  return result.insertedId;
});
