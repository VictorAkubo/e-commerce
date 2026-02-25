import jwt from "jsonwebtoken"

export const authMiddleware =(req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1]
  if(!token){
    res.status(401).json({
      status:401,
      message:"token not found"
    })
  }
  try{
    const decoded = jwt.verify(token,"gaysfjsnxyye6eb3b3is7b3bvdb")
    req.user = decoded
    next()
  }catch(error){
    res.status(401).json({
      status:401,
      message:'invalid token'
    })
  }
}