import db from '~/services/db';

export default defineEventHandler(async (event) => {
  const templateDocs: any = await db.templateCol
    .find({}).toArray();
  return [
    {
      name: '預設',
      template: [],
    },
    ...templateDocs.map((doc: any) => {
      return {
        name: doc.name,
        template: doc.template,
      };
    }),
  ];
});
