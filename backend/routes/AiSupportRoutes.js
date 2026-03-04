import {Router} from "express"
import { AiSupport,PuterAiSupport} from "../controllers/aiSupportController.js"

const AiSupportRouter = Router();
AiSupportRouter.post("/chat",AiSupport)
AiSupportRouter.post("/chatputer",PuterAiSupport)

export default AiSupportRouter;