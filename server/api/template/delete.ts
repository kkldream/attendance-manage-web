import db from '~/services/db';
import {ObjectId} from "mongodb";

interface Request {
  templateId: string;
}

export default defineEventHandler(async (event): Promise<boolean> => {
  const body = await readBody(event) as Request;
  const result = await db.templateCol
    .deleteOne({_id: new ObjectId(body.templateId)});
  console.log(result);
  return result.deletedCount > 0;
});
