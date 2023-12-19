import db from '~/services/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await db.templateCol
    .insertOne(body);
  return result.insertedId;
});
