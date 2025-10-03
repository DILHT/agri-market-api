import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import config from '../../config/config.js'

export const authenticate = async(req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }

    try{
        const decoded = jwt.verify(token,config.jwtSecret);

        const user = await User.findByPk(decoded.id);
        if(!user){
            return res.status(401).json({message:"Invalid token"})
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({message:"token failed verifyin"})
    }
}