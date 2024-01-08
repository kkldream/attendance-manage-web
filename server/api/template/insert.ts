import db from '~/services/db';
import {Template} from "~/types/documents/TemplateDocument";

interface Request {
    peopleDoc: Template;
}

export default defineEventHandler(async (event) => {
    const {peopleDoc} = await readBody(event) as Request
    const result = await db.templateCol
        .insertOne(peopleDoc as any);
    return result.insertedId;
});
