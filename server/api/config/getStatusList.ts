import db from '~/services/db';

export default defineEventHandler(async (event): Promise<string[]> => {
  const configDoc
    = await db.configCol.findOne({type: "statusList"});
  return configDoc?.config ?? ["載入失敗"];
});
