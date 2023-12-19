import db from '~/services/db';

export default defineEventHandler(async (event) => {
  const attendanceTypes: any[] = await db.attendanceCol
    .find({}).toArray();
  return attendanceTypes.map(doc => doc.name);
});
