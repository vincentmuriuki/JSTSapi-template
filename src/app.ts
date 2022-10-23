import express = require("express");
import fs = require("fs");
import { urlencoded, json } from "body-parser";
import * as cors from "cors";
// import socketIo from 'socket.io';
import * as passport from "passport";
import * as morganLogger from "morgan";
import * as helmet from "helmet";
// import csurf from 'csurf';
import * as cookieParser from "cookie-parser";
import logger from "./utils/winston";
import Responses from "./utils/response";
import router from "./api/routes";
import ErrorHandler from "./utils/error";
import config from "./config";
import expressSession = require("express-session");

const isDevelopment = config.env;
const app = express();

// @ts-ignore
app.use(helmet());

app.use(cookieParser(config.default.cookies.secret));
app.use(
  expressSession({
    secret: config.default.secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
passport.serializeUser((user: any, done: any) => done(null, user));
passport.deserializeUser((user: any, done: any) => done(null, user));
app.use(
  morganLogger("common", {
    stream: fs.createWriteStream(".logs/request.log", { flags: "a" }),
  })
);

app.use(morganLogger("dev"));
app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());
app.set("port", config.default.PORT || 8080);

const server: any = app.listen(app.get("port"), () => {
  logger.info(`Express running → PORT ${server.address().port}`);
});

app.use(router);
app.use((req, res) => Responses.handleError(404, "Route not found", res));
// development error handler middleware
app.use((err: any, req: any, res: any, next: any) => {
  if (isDevelopment !== "development") {
    next(err);
  }
  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip} - Stack: ${err.stack}`
  );
  return Responses.handleError(err.statusCode || 500, `${err.message}.`, res);
});

// Production and testing error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((err: any, req: any, res) => {
  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip} - Stack: ${err.stack}`
  );
  return Responses.handleError(err.statusCode || 500, err.message, res);
});

process.on("unhandledRejection", (reason) => {
  throw new ErrorHandler(reason);
});

process.on("uncaughtException", (error) => {
  logger.error(
    `Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`
  );
  process.kill(process.pid, "SIGTERM");
});
// Gracefull shut downs.
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received.");
  logger.info("Closing http server.");
  server.close(() => {
    logger.info("Http server closed.");
  });
});


export default app;