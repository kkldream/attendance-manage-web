import axios from "axios";

interface Request {
  mail: string[];
  html: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Request;
  return body.mail.map(async (mail) => {
    let config = {
      method: 'post',
      url: 'https://api-dev.homeeasy.app/Api/Develop/SendEmail',
      headers: {
        Authorization: "mmslab406"
      },
      data: {
        "email": mail,
        "content": body.html,
      }
    };
    const {data} = await axios.request(config);
    return data.status === 0;
  });
});
