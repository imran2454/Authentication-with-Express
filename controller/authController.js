const userModel = require("../model/userSchema");
const emailValidator=require('email-validator')
const bcrypt=require('bcrypt')

// SignUp Page
const signup=async(req,res,next)=>{
    const{name,email,password,confirmpassword}=req.body;
    console.log(name,email,password,confirmpassword);
        if(!name||!email||!password||!confirmpassword){
            return res.status(400).json({
                sucess:false,
                message:'every field is required'
            })
        }
    // Email validate
       const validEmail=emailValidator.validate(email);
       if(!validEmail){
            return res.status(400).json({
            sucess:false,
            message:'enter Vailid email id'
        })
       }
    //    End email validat
       if(password !==confirmpassword){
            return res.status(400).json({
            sucess:false,
            message:'password and confirmpassword do not match'
        })

       }

    try {
        const userInfo=userModel(req.body);
        const result=await userInfo.save();
        return res.status(200).json({
            sucess:true,
            message:result
        })

    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                sucess:false,
                message:`Account alreddy registerd`
            })
           
        }
        console.log(error);
        return res.status(400).json({
            sucess:false,
            message:error.message
        })
        
    }




    

}

// signin page
const signin=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400).json({
            sucess:false,
            message:"please enter email or password"
        })
    }
// signin k liy jo bhi email id or password diye hai kya wo database mai exist karti hai ki nahi
try {
    const user= await userModel.findOne({email}).select ('+password');
    // bina encript ke password ka compare
    // if(!user || user.password !==password )
    if(!user || !( bcrypt.compare(password,user.password))){
            res.status(400).json({
            sucess:false,
            message:"Invalid Credintial"
        })
    }

    // generate token
    const token=user.jwtToken();
    user.password=undefined;
  
    const cookiesOption={
        maxAge:72*60*60*1000,
        httpOnly:true
    };
    res.cookie("token",token, cookiesOption)
    res.status(200).json({
        sucess:true,
        data:user
    })
    
} catch (error) {
    res.status(400).json({
        sucess:false,
        message:error.message
    })
    
}   

}
// getUser

const getUser=async(req,res,next)=>{
    const userId=req.user.id;
    try {
    const user=await userModel.findById(userId);
    return res.status(200).json({
        sucess:true,
        data:user
    })
    } catch (error) {
        return res.status(400).json({
            sucess:false,
            message:error.message
        })
        
    }

}
const logout=(req,res)=>{

    try {
        const cookiesOption={
            expires:new Date(),
            httpOnly:true
        }
        res.cookie("token",null,cookiesOption)
        return res.status(200).json({
            sucess:true,
            message:'Logout'

        })
        
    } catch (error) {
        return res.status(400).json({
            sucess:false,
            message:error.message

        })
        
    }

}


module.exports={
    signup,
    signin,
    getUser,
    logout
}