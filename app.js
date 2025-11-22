import express from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
dotenv.config({path: './.env'})

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/api/v1/auth' , authRouter);



export default app ; 