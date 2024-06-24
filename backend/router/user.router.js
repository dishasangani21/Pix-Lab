import  express  from "express";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { authenticate } from "../middelware/authenticate.js";

const router = new express.Router()


router.post("/signup" , async(req,res)=>{

    const {name , email , password} = req.body

    if(!name || !email || !password){
        res.status(4220).json({error : "fill all the details"})
    }

    try {
        const preuser = await User.findOne({email : email})

        if(preuser){
            res.status(422).json({error : "Tihs Email is Already Exist"})
        }else{
            const finaluser = new User({
                name,
                email,
                password
            })

            const storeData = await finaluser.save()

            // console.log(storeData)

            res.status(201).json({status:201 , storeData})

            
        }

    } catch (error) {
        res.status(422).json(error)
        console.log("catch block error")

    }

})



// login router

router.post("/login" , async(req, res)=>{
    // console.log(req.body)
    const { email , password} = req.body

    if( !email || !password){
        res.status(422).json({error : "fill all the details"})
    }

    try {
        
        const  userValid = await User.findOne({email : email})

        if(userValid){
            const isMatch = await bcrypt.compare(password , userValid.password)

            if(!isMatch){
                res.status(422).json({error : "Invalid Password"})
            }
            else{

                // token genetate

                const token = await userValid.generateAuthtoken()
                // console.log(token);

                // cookieGenerate
                res.cookie("usercookie" , token , {
                    expires : new Date(Date.now()+9000000),
                    httpOnly : true
                })

                const result = {
                    userValid,
                    token
                }

                res.status(201).json({status : 201 , result})
            }
        }

    } catch (error) {
        
    }
})




//uservalid

router.get("/validuser", authenticate ,async(req, res)=>{
    
    try {
        const ValidUserOne = await User.findOne({_id : req.userId});
        // console.log(ValidUserOne);
       
        res.status(201).json({status:201 , ValidUserOne})

    } catch (error) {
        res.status(401).json({status:401 , error})

    }
})


//user logout 

router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

        // console.log(req.rootUser);

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


export default router