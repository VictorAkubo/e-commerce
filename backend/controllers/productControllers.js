import Product from "../schema/db.js"

export const getProducts = async(req, res) => {
  const name = "victor";
  try{
  const AllProduct = await Product.find()
  res.status(200).json({
    success:true,
    count:AllProduct.length,
    product:AllProduct
  })
  }catch(err){
    res.status(400).json({product:"error occured while fetching check your connectiom"})
  }
}