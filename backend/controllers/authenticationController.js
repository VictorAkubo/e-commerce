import authentication from "../schema/auth.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export const SignUp = async (req, res) => {
  
  const { name, email, password } = req.body;
  const userExists = await authentication.findOne({ email });
  try{
  if (!userExists) {
    console.log("created successfull");
    const saltround = 10;
    const salt = await bcrypt.genSalt(saltround)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await authentication.create({
      name,
      email,
      password :hashedPassword
    });
    
    const token = jwt.sign({email:newUser.email,name:newUser.name},"gaysfjsnxyye6eb3b3is7b3bvdb",{ expiresIn: "1d" })
    res.status(201).json({
      status: 201,
      message:newUser.name + " created successfully",
      token,
      userDetails:{
          name:userExists.name,
          email:userExists.email
        },
    });
    

  }else {
    console.log("unable to create account");
    res.status(400).json({
      status: 400,
      message: email + " already exists"
    });
  }
  }catch(err){
    res.status(500).json({
      status: 500,
      message:err.message
    });
  }
  
};
export const SignIn =async(req,res)=>{
  
  const {email,password} = req.body;
  
  const userExists = await authentication.findOne({email});
  if(userExists){
    const matchedPassword = await bcrypt.compare(password,userExists.password)
    if(matchedPassword){
      console.log("login successfull")
      const token = jwt.sign({email:userExists.email,name:userExists.name},"gaysfjsnxyye6eb3b3is7b3bvdb",{ expiresIn: "1d" })
      res.status(200).json({
        status:200,
        message:"login successfull",
        userDetails:{
          name:userExists.name,
          email:userExists.email
        },
        token
      })
    }else{
      res.status(400).json({
        status:400,
        message:"password not correct"
      })
    }
  }else{
    res.status(400).json({
      status:400,
      message:email + " user doesn't exist"
    })
  }
  
}