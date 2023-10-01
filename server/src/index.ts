import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"
import { userRouter } from './routes/user'

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