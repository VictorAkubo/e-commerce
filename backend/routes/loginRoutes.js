import {Router} from "express"
import {SignIn,SignUp} from "../controllers/authenticationController.js"
const loginRouter = Router();

loginRouter.post("/login",SignIn)
loginRouter.post("/signup",SignUp)

export default loginRouter