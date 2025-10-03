import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../../config/config.js'
import { where } from 'sequelize';


export const register = async(req,res) =>{

    try{

    const {username,email, password, role } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:"Username, email and password are required"});
    }

    //check for user excisitance
    const existUser = await User.findOne({where:{email}});
    if(existUser){
        return res.status(400).json({message:"Email already registered"})
    }

    //hash the pwd
    const hashedpassword = await bcrypt.hash(password,10)

    //create user 
    const newUser = await User.create({
        username,
        email,
        password:hashedpassword,
        role: role || "customer",
    });

    res.status(201).json({message:"User registered Successfully ", userId:newUser.id})
}catch(error){
    res.status(500).json({message:"registeriing went wrong"})
}

}

export const login = async(req,res) =>{

    try{

        const {email , password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message:"Email n password required"})
        }

        //find user 
        const user = await User.findOne({where:{email}})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }

        //check pwd
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }

        //generate a tokem
        const token = jwt.sign(
            {id:user.id,role:user.role},
            config.jwtSecret,
            {expiresIn:"1h"}
        );

        res.status(201).json({
            message:"Login successful",
            token,
            user:{
                id:user.id,
                username:user.username,
                role:user.role
            }
        })

    }catch(error){
        res.status(500).json({message:"internal server error",error})
    }

}