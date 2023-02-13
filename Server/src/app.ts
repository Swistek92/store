import * as dotenv from "dotenv";
import config from "config";
import createServer from "./utils/server";
import logger from "./utils/logger";

dotenv.config();

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`listen http://localhost:${port}/ ons port ${port}`);
  // await connect();
});
