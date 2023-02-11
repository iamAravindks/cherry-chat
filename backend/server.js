import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import morgan from "morgan";
import { startSocket } from "./startSocket.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));

connectDB();
const PORT = 5000 || process.env.PORT;

const server = http.createServer(app);
// socket connection
startSocket(server);

app.use("/api/users", userRouter);


app.use(errorHandler);
server.listen(PORT, () => console.log(`server listen at ${PORT}`));
