import  jwt  from "jsonwebtoken"
import { User } from "../model/user.model.js";

export const authenticate = async(req, res, next) =>{
    try {
        const token = req.headers.authorization
        // console.log(token)

        const varifytoken = jwt.verify(token , process.env.JWT_SECRET)
        // console.log(varifytoken);

        const rootUser = await User.findOne({_id : varifytoken._id})
        // console.log(rootUser)

        if(!rootUser){
            return res.status(401).json({error: 'User not found'});
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next()

    } catch (error) {
         return res.status(401).json({ status :401 ,message: 'Unauthorized no token provide'});

    }
}


 