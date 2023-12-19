import db from '~/services/db';

interface Request {
    username: string;
    password: string;
}

export default defineEventHandler(async (event): Promise<string | null> => {
    const body = await readBody(event) as Request;
    const result = await db.accountCol.findOne({
        username: body.username,
        password: body.password,
    });
    return result?.token ?? null;
});
