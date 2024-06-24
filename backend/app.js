import connectDB from "./db/conn.js"
import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import router from  './router/user.router.js'
import cookieParser from "cookie-parser"

// require("dotenv").config()
dotenv.config()
const app = express()

const port = process.env.PORT || 3001
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(router)


app.get("/" , (req, res)=>{
    res.status(200).json("server start")
})





app.listen(port,()=>{
    console.log(`server start at port no ${port}`)
})

