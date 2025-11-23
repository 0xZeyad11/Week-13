import { User } from '../models/users.model.js';
import jwt from 'jsonwebtoken'

const signToken = (user) =>{
    const secret = process.env.JWT_SECRET;
    const expiry=  process.env.JWT_EXPIRY ;
    if(!secret || !expiry){
        throw new Error("both jwt secret and expiry should be defined")
    }
    // return a token for a given user
    return jwt.sign({id: user.id , email: user.email , username: user.username} , secret , {
        expiresIn: expiry
    })
}


export const signup = async (req , res ,next) => {
    try {
        // Check for all necessary data
        const {email, username,password} = req.body ; 
        if(!email || !username || !password){
            return res.status(400).json({
                status: 'failed',
                message: 'please provide all required fields'
            })
        }

        const finduser  = await User.findOne({email});
        if(finduser){
            return res.status(400).json({
                status: 'failed',
                message: 'this user already existed , please login'
            })
        }

        const newuser = await User.create({email, password, username});
        const token = signToken(newuser);
        res.status(201).json({
            status: 'success', 
            token
        })

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error
        })
    }
}

export const login = async (req,res,next) =>{
    try {
        const {username , password} = req.body ; 
        if(!username || !password){
            return res.status(400).json({
                status: 'failed',
                message: "please provide all required fields"
            })
        }
        const finduser = await User.findOne({username});
        if(!finduser){
            return res.status(400).json({
                status: "failed",
                message: "this user does not exist"
            })
        }

        const token = signToken(finduser);
        res.status(200).json({
            status: 'success',
            token
        })

        
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            error
        })
        
    }
}


export const getMe =  async (req, res,next) => {
    try {
        
        const user = req.user
        res.status(200).json({
            status: "success",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status:"failed", 
            message: "something went wrong",
            error
        })
    }
}