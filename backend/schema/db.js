import mongoose from "mongoose"
const productSchema= mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    oldPrice: Number,
    rating: Number,
    totalReviews: Number,
    stock: Number,
    img: String,
    description:String,
    sizes: [String],
    colors: [String],
    isFeatured: Boolean,
})

const Product = mongoose.model("Product", productSchema);

export default Product;
