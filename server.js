import mongoose from 'mongoose'
import app from './app.js';
const DB_URL = process.env.DB_URL

const connectDB = async() => {
    try {
       await mongoose.connect(DB_URL) ; 
       console.log("DB connected successfully")
    } catch (error) {
       console.error(error); 
       throw error; 
    }
}
connectDB();

app.listen(3000, () => {
    console.log('server is listening')
})




