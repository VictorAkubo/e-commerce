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

export const postProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      rating,
      totalReviews,
      stock,
      colors,
      sizes,
      category
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      oldPrice: Number(oldPrice),
      rating: Number(rating),
      totalReviews: Number(totalReviews),
      stock: Number(stock),
      colors: JSON.parse(colors),
      category,
      sizes: JSON.parse(sizes),
      img: req.file ? req.file.filename : null
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      product: savedProduct
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating product"
    });
  }
};