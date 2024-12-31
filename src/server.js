/* eslint-disable no-console */
import exitHook from "async-exit-hook";
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import cookieParser from "cookie-parser";
import { APIsV1 } from "~/routes/v1";
import { corsOptions } from "./config/cors";
import { CONNECT_DB, DISCONNECT_DB } from "./config/database";
import { env } from "./config/environment";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import registerSocketHandlers from "./sockets/index.js";
import { __PROD__ } from "./utils/constants";

const START_SERVER = () => {
  const app = express();

  let PORT;
  if (__PROD__) {
    PORT = env.APP_PORT || 2003;
  } else {
    PORT = env.APP_PORT || 2000;
  }

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());

  app.use("/api/v1", APIsV1);
  app.use(errorHandlingMiddleware);

  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ statusCode: 200, message: "Hello, this is DevT Coin API" });
  });

  const server = http.createServer(app);
  // Khởi tạo Socket.IO
  const io = new Server(server, {
    cors: {
      origin: "*", // Hoặc thay thế bằng URL frontend
      methods: ["GET", "POST"],
    },
  });

  // Đăng ký các handler cho Socket.IO
  registerSocketHandlers(io);

  server.listen(PORT, () => {
    console.log(
      "[INFO] 👉",
      `Hello ${env.AUTHOR}, Server is running at http://${
        __PROD__ ? "" : "localhost"
      }:${PORT} - BUILD_MODE: ${env.BUILD_MODE}`
    );
  });

  exitHook(() => {
    DISCONNECT_DB();
    console.log("[INFO] 👉", "Exit App");
  });
};

(async () => {
  try {
    console.log("[INFO] ⏳ Đang kết nối Database");
    await CONNECT_DB();
    console.log("[INFO] ✅ Đã kết nối thành công đến Database");
    START_SERVER();
  } catch (error) {
    console.log("[ERROR] 👉", `${error} ❌`);
    process.exit(0);
  }
})();
