import db from '~/services/db';
import {Template} from "~/types/documents/TemplateDocument";

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Template
  const result = await db.templateCol
    .insertOne(body as any);
  return result.insertedId;
});
