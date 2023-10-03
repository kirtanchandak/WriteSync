import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"
import { userRouter } from './routes/user'
import http from 'http';
import {Server} from "socket.io"

dotenv.config({ path: "./.env" })

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)

mongoose.connect(process.env.MONGODB_URL || "")

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`)
})

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User Connected");
})

server.listen(3001, () => {
  console.log("Socket server listening on port 3001");
})