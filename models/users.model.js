import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true , 
        unique: true
    }, 
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save' , async function(){
    // make sure that the password is updated in order to hash the new password
    if(!this.isModified('password')) return ; 
    try {
        const SALT = process.env.SALT ;
        if(!SALT)
            throw new Error("SALT value is undefined")
       const hashedPassword = await bcrypt.hash(this.password, parseInt(SALT)); 
       this.password = hashedPassword;
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User' , UserSchema);