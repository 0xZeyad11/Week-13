import jwt from "jsonwebtoken";

export const protect = async (req ,res ,next) => {
    const token = req.cookies.jwt ;

    if(!token){
        return res.status(401).json({
            status: 'failed', 
            message: 'Please login again!'
        })
    }

    try {
        console.log("jwt value: " , token)
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET)
            throw new Error("Failed loading the jwt secret")
        const decoded = jwt.verify(token , JWT_SECRET);
        console.log(decoded);
        req.user = decoded ; 
        next();
    } catch (error) {
        console.log(error)
       next(error); 
    }
}
