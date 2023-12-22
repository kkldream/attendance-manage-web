import AWS from 'aws-sdk';

interface Request {
  mail: string[];
  html: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Request;
  const emailParams: EmailParams = {
    to: body.mail,
    htmlBody: body.html,
  };
  try {
    await sendEmail(emailParams);
    console.log('Email sent successfully:');
    console.log(body.mail);
  } catch (error) {
    console.error('Error sending email:', error);
  }
  return true;
});

interface EmailParams {
  to: string[];
  htmlBody: string;
}

// TODO accessKeyId、secretAccessKey好像不需要
const awsAccessKeyId: string = (process.env.AWS_ACCESS_KEY_ID || '').trim();
const awsSecretAccessKey: string = (process.env.AWS_SECRET_ACCESS_KEY || '').trim();
const awsRegion: string = (process.env.AWS_REGION || '').trim();
const emailSubject: string = 'MMSLAB Attendance';
const emailFromName: string = 'MMSLAB點名系統';
const emailFromEmail: string = 'italkutalktw@gmail.com';

async function sendEmail(emailParams: EmailParams): Promise<void> {
  AWS.config.update({
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion,
  });

  // 建立 SES 實例
  const ses = new AWS.SES({apiVersion: '2010-12-01'});

  // 設定要發送的郵件資訊
  const params = {
    Destination: {
      ToAddresses: emailParams.to,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emailParams.htmlBody,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: emailSubject,
      },
    },
    Source: `"${emailFromName}" <${emailFromEmail}>`,
  };

  // 使用 SES 的 sendEmail 方法發送郵件
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.error('Error sending email:', err);
        reject(err);
      } else {
        console.log('Email sent successfully:', data);
        resolve();
      }
    });
  });
}