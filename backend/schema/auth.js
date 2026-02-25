import mongoose from "mongoose"
const authSchema = mongoose.Schema({
  password:{
    required:true,
    type:String,
  },
  email:{
    unique:true,
    required:true,
    type:String,
  },
  name:{
    required:true,
    type:String,
  }
})

const authentication = mongoose.model("Auth",authSchema)
export default authentication;