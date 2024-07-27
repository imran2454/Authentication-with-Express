const mongoose=require('mongoose')
// const {Schema}=mongoose;
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const userShcema= new mongoose.Schema({
    name:{
        type:'String',
        required:[true,'name must be required'],
        trim:true
    },
    email:{
        type:'String',
        required:[true,'email must be required'],
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:'String',
        select:false

    },
    // confirmpassword:{
    //     type:'String',
    // },
    forgotpassword:{
        type:'String'
    },
    forgotpasswordExpiry:{
        type:'Date'
    }
},{
    timestamps:true
});
// password bcrypt karne k liy
userShcema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    return next();
})
// Create Cookies (generat jwt token)
userShcema.methods={
    jwtToken(){
        return JWT.sign(
            {id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
         
        )
    },
}
// End tokan


const userModel=mongoose.model('user',userShcema)
module.exports=userModel;