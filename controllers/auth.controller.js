import jwt from "jsonwebtoken"


// Utility function that returns a  JWT token
export const signToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET; 
    const JWT_EXPIRY = process.env.JWT_EXPIRY;
    return jwt.sign(
        { sub: user.id, email: user.email, username: user.username },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRY
        })
}



