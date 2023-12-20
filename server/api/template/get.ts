import db from '~/services/db';
import type {TemplateWithId} from "~/types/indexType";

export default defineEventHandler(async (event): Promise<TemplateWithId[]> => {
  const res = await db.templateCol.find({}).toArray();
  return res.map(res => ({
    templateId: res._id.toString(),
    name: res.name,
    template: res.template,
  }));
});
