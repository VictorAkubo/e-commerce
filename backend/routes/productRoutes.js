import {Router} from "express"
import {getProducts} from "../controllers/productControllers.js"
const productRouter = Router()

productRouter.get('/',getProducts)
/*
router.post('/',postProduct)
router.put('/update/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)
*/

export default productRouter;