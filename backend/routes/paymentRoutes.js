import {Router} from "express"
import {PaymentCheckout} from "../controllers/paymentController.js"
const paymentRouter = Router();
paymentRouter.post("/create-checkout-session",PaymentCheckout)

export default paymentRouter;