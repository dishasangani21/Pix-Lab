import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    image :{
        type:String
    },
    googleId :{
        type :String
    },

    tokens : [
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

}, { timestamps: true })


userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 12)
    }
    
    next()
})

//generateAuthtoken


userSchema.methods.generateAuthtoken = async function(){
        try {
            let token = jwt.sign( { _id : this._id } ,  process.env.JWT_SECRET , {
                expiresIn :  '1d'
            } )

            this.tokens = this.tokens.concat({token : token})
            await this.save()
            return token
                
        } catch (error) {
            res.status(422).json(error)

        }
}


export const User = mongoose.model("User", userSchema)