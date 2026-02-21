import {Router} from "express"
import {getProducts,postProduct} from "../controllers/productControllers.js"
import multer from "multer"

const upload = multer({ dest: './public/data/uploads/' })
const productRouter = Router()


productRouter.get('/',getProducts)

productRouter.post("/post", upload.single("img"), postProduct);
/*
productRouter.put('/update/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)
*/


export default productRouter;