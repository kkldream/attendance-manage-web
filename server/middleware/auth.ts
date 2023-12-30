import db from '~/services/db';

export default defineEventHandler(async (event) => {
    if (event.path === "/api/account/login") return;
    if (event.method !== 'POST') return;
    const {token} = await readBody(event);
    const result = await db.accountCol.findOne({token});
    if (!result) throw new Error("無效的Token");
})
