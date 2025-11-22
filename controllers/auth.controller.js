import jwt from "jsonwebtoken"
import { User } from "../models/users.model.js";


// Utility function that returns a  JWT token
export const signToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET; 
    const JWT_EXPIRY = process.env.JWT_EXPIRY;
    // make sure we correctly load all required config variables
    if(!JWT_EXPIRY || !JWT_SECRET){
        throw new Error("either jwt expiry or secret is not defined")
    }
    console.log(JWT_EXPIRY);
    return jwt.sign(
        { sub: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRY
        })
}


export const signup = async (req , res , next) => {
    try {
       // Grab user data from the request body
       const {username , email , password } = req.body ;  

       // Check that the user has sent all required fields for the signup
       if(!username || !email || !password){
        return res.status(400).json({
            status: "failed",
            message: "username, email and password should be provided",
        })
       }

       const finduser = await User.findOne({email});
       if(finduser){
        return res.status(409).json({
            status: 'failed',
            message: 'This user already exists'
        })
       }

       // Create a new user
       const newUser = await User.create({username,password , email})

       // create the signup token 
       const token = signToken(newUser);

       // send the token in the cookies for a safe storing 
       res.cookie("jwt" , token , {
        expires: new Date(Date.now() + 30*24*3600*1000),
        httpOnly: true , 
        secure: process.env.NODE_ENV === 'production'
       })

       
       res.status(200).json({
        status: "success"
       })
    } catch (error) {
       return res.status(400).json({
        status: 'failed',
        message: 'failed to create the new user', 
        error: error
       }) 
    }
}

export const login = async (req, res,next) => {
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: 'failed',
                message: "make sure to provide both email and password"
            })
        }

        //make sure that the user already exists!
        const finduser  = await User.findOne({email});
        if(!finduser){
            return res.status(404).json({
                status: 'this user does not exists!', 
            })
        }

        const login_token = signToken(finduser);
        res.cookie("jwt", login_token, {
            expires: new Date(Date.now() + 30*24*3600*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        res.status(200).json({
            status: 'user logged in!'
        })
    } catch (error) {
        
        return res.status(400).json({
            status: 'failed', 
            message: 'something went wrong logging in the user',
            error
        })
    }
}


export const getMe = async (req, res, next) => {
    try {
        console.log(req.user)
        res.status(200).json({
            status: 'success',
            user: req.user
        })
    } catch (error) {
       next(error); 
    }
}