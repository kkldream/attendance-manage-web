import db from '~/services/db';
import type {Template} from "~/types/documents/TemplateDocument";

export default defineEventHandler(async (event): Promise<Template[]> => {
  const templateDocs
      = await db.templateCol.find({}).toArray();
  return [
    {
      name: '預設',
      template: [],
    },
    ...templateDocs.map(doc => ({
      name: doc.name,
      template: doc.template,
    })),
  ];
});
