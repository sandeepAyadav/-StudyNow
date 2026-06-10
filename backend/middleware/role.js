


export const isTeacherWare = async(req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"you are authorized"
            })
        }
      if(req.user.role != "Teacher"){
        return res.status(403).json({
            success:false,
            message:"yuo are not teacher"
        })
      }
      next();
    }catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"you can not create course"
})
    }
}

export const isStudent = async(req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({
                success:false,
                message:"you are authorized"
            })
        }
        if(req.user.role !== "Student"){
            return res.status(403).json({
            success:false,
            message:"yuo are not student so you cannot see the course"
        })
        }
        next();

    }catch(error){
        console.log(error);
        return res.status(500).json({
    success:false,
    message:"you are not allow to see the course"
})

    }
}