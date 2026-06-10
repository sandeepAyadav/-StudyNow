import bcrypt from "bcryptjs"
import { User } from "../model/authSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import  jwt  from "jsonwebtoken";


export const resgister = async (req, res) => {
    try {
        const { name, email, password, number, role } = req.body;
        
        if (!name || !email || !password || !number || !role) {
            return res.status(400).json({
                message: "fill all field",
                success: false 
            });
        }
        
        if (String(number).length !== 10) {
            return res.status(400).json({
                message: "number length must be 10 ",
                success: false
            });
        }
        
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false, 
                message: "user already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const Newuser = await User.create({
            name,
            email,
            password: hashedPassword,
            number,
            role
        });
        
        const userWithoutpassword = Newuser.toObject();
        delete userWithoutpassword.password;

        const emailMessage = `Hi ${name},\n\nWelcome to our E-Learning Platform! Your account has been successfully created as a ${role}.\n\nHappy Learning!\nBest Regards,\nTeam LMS`;

  
        await sendEmail({
            email: email, 
            subject: "Welcome to LMS Platform! 🎉",
            message: emailMessage,
            html: `<h1>Welcome ${name}!</h1><p>Your account is active now as a <b>${role}</b>.</p>`
        });

        return res.status(200).json({
            message: "successfully created",
            success: true,
            user: userWithoutpassword 
        });

    } catch (error) {
        console.log("signup backend error",error);
        return res.status(500).json({
            success: false,
            message: "register not done "
        });
    }
};



export const login = async(req,res)=>{
    try{
const {email,password} = req.body;
if(!email || !password){
    return res.status(400).json({
        message:"fill alll field",
        success:false
    })
}
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({
        success:false,
        message:"please login"
    })
}
const isPasswordMatch = await bcrypt.compare(password,user.password);
if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }
 const userToken = await jwt.sign(
    {userId:user._id},
    process.env.SECRETKEY,
    {expiresIn:"1d"}
  )
  const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
  return res.status(200).json({
    success:true,
    message:"sucssefully login",
    userToken,
    user: userWithoutPassword,
    role:userWithoutPassword.role
    
  });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"login fail"

        })

    }
}


export const logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{
            httpOnly:true,
            expires: new Date(0)
        }).json({
            success:true,
            message:"logout successfully"
        })
        
    }catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"not logout"
})
    }
}


export const forgetPassword = async(req,res)=>{
    try{

       const {email} = req.body;
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({
            success:true,
            message:"email not found"
        })
       }
       const otp = await Math.floor(100000 + Math.random() * 900000);
       user.forgotPasswordOtp= otp;
       user.forgotPasswordOtpExpiry = new Date(Date.now() + 5 * 60 * 1000);
     await user.save();
    const emailMessage = `Hi ${user.name},\n\nYou requested a password reset. Your 6-digit OTP is:\n\n👉 ${otp} 👈\n\nThis OTP is valid for 5 minutes only. If you didn't request this, please ignore this email.`;

        await sendEmail({
            email: user.email,
            subject: "Password Reset OTP - LMS Platform",
            message: emailMessage,
            html: `<h3>Hi ${user.name},</h3><p>Your OTP for password reset is:</p><h1 style="color: #4A90E2;">${otp}</h1><p>Valid for <b>5 minutes</b> only.</p>`
        });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email."
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });

    }
}


export const resetPassword = async(req,res)=>{
    try{
        const {email,otp,newPassword}= req.body;
        if(!email || !otp || !newPassword){
            return res.status(400).json({
                success:false,
                message:"fill all resetpasswoed filed"
            })
        }
        const user = await User.findOne({email})
        if(!user){
             return res.status(400).json({
                success:false,
                message:"resetpassword user not found"
            })
        }
        if(Date.now()> user.forgotPasswordOtpExpiry){
             return res.status(400).json({
                success:false,
                message:"otp has expire "
            })
        }
  if(user.forgotPasswordOtp !== Number(otp)){
     return res.status(400).json({
                success:false,
                message:"otp not match"
            })
  }
  const hashedPassword = await bcrypt.hash(newPassword,10);
  user.password = hashedPassword;
  user.forgotPasswordOtp = undefined;
  user.forgotPasswordOtpExpiry = undefined;
  await user.save();
  return res.status(200).json({
            success: true,
            message: "Password reset successfully! You can now login with your new password."
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }

    }
