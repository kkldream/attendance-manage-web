import axios from "axios";

interface Request {
  html: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Request;
  let config = {
    method: 'post',
    url: 'https://api-dev.homeeasy.app/Api/Develop/SendEmail',
    headers: {
      Authorization: "mmslab406"
    },
    data: {
      "email": "kk69347321@gmail.com",
      "content": body.html,
    }
  };
  const {data} = await axios.request(config);
  return data;
});
