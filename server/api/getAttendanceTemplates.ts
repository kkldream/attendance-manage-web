import db from '~/services/db';

export default defineEventHandler(async (event) => {
  // const peoples = await db.peopleCol.find({}).toArray();
  // return {
  //   count: peoples.length,
  //   docs: peoples
  // };
  return [
    '自訂',
  ];
});
