import db from '~/services/db';

interface LoginRequest {
  username: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const body: LoginRequest = await readBody(event);
  const result: any = await db.accountCol.findOne({
    username: body.username,
    password: body.password,
  });
  return {token: result?.token};
});
