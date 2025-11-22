import express from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config({path: './.env'})

const app = express()
app.use(express.json())
app.use(morgan('dev'))



export default app ; 