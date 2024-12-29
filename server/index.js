
import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/users",userRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected...")
        app.listen(process.env.PORT,() => {
            console.log(`server is running port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })