import db from '~/services/db';

export default defineEventHandler(async (event) => {
  return await db.recordCol
    .find({})
    .sort({createTime: -1})
    .toArray();
});
