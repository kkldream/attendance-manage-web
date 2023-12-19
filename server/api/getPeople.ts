import db from '~/services/db';

export default defineEventHandler(async (event) => {
  const peoples = await db.peopleCol
    .find({})
    .sort({index: 1})
    .toArray();
  return {
    count: peoples.length,
    docs: peoples
  };
});
