import jwt from 'jsonwebtoken';


export const protectRoute = async (req, res , next) =>{
    try {
        // Bearer kldjfalkj12jsdafhagalkdbsdabfsdabfasdfl;sad

        const token = req.headers.authorization.split(' ')[1] ; 
        if(!token){
            res.status(401).json({
                status: 'failed', 
                message: "You don't have the permission to access this route"
            })
        }

        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error("failed loading the JWT SECRET")
        }

        const payload = jwt.verify(token , secret);
        req.user = payload;

        next();

        
    } catch (error) {
       next(error); 
    }
}