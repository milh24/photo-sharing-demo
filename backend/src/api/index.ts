import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import { errorHandler, httpErrorHandler } from "../middlewares/errorHandler";
import logger from "../middlewares/logger";
import routerV1 from "./v1";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(logger);
app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
);
app.set("json replacer", (k: unknown, v: unknown) =>
  v === null ? undefined : v
);

/* General */
app.use(["/v1", "/api/v1"], routerV1);
app.use("*", (req, res) =>
  res.status(404).json({ code: "error/invalid-request" })
);

app.use(errorHandler);
app.use(httpErrorHandler);
app.use(compression());

export default app;
