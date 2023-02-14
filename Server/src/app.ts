import cors from "cors";
/* eslint-disable import/first */
import * as dotenv from "dotenv";
dotenv.config();
import config from "config";
import createServer from "./utils/server";
import logger from "./utils/logger";
import connect from "./utils/connect";

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`listen http://localhost:${port}/ ons port ${port}`);
  await connect();
});
