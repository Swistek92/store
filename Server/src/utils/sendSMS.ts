import { Twilio } from "twilio";
import logger from "./logger";
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const phoneFrom = `${process.env.TWILO_PHONE_NUMBER}`;
// const client = require("twilio")(accountSid, authToken);

const client = new Twilio(accountSid, authToken);
// +13157847889;

export const sendSms = (to: string, body: string, txt: string) => {
  try {
    client.messages
      .create({
        body: `wellcome to mems, ${body} - ${txt}`,
        from: phoneFrom,
        to: `+48${to}`,
      })
      .then((message: { sid: string }) => console.log(message.sid));
  } catch (error) {
    logger.error(error);
  }
};
