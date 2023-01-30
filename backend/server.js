import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import { errorHandler } from "./middlewares/errorMiddleware.js"
import userRouter from "./routes/userRouter.js"

const app = express()
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB()
app.use("/api/users", userRouter);

const PORT = 5000 || process.env.PORT

const server = http.createServer(app)
const io = new Server(server, {
    /* options */
    cors: 'http://localhost:3000',
});


app.use(errorHandler)
server.listen(PORT,()=>console.log(`server listen at ${PORT}`))