import { Twilio } from "twilio";
import logger from "./logger";
const accountSid = `AC${process.env.TWILIO_ACCOUNT_SID!}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const phoneFrom = `${process.env.TWILO_PHONE_NUMBER}`;
// const client = require("twilio")(accountSid, authToken);

const client = new Twilio(accountSid!, authToken);
// +13157847889;

export const SendRegistrationSms = async (
  to: string,
  body: string,
  txt: string
) => {
  try {
    const clinet = await client.messages.create({
      body: `wellcome to mems, ${body} - ${txt}`,
      from: phoneFrom,
      to: `+48${to}`,
    });
  } catch (error: any) {
    logger.error(error);
    throw new Error(error);
  }
};
