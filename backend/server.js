import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Stripe from "stripe";
import productRouter from "./routes/productRoutes.js"; // your existing product routes
// we’ll create this
import 'dotenv/config';
import path from "path"


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
/*app.use(express.static(path.join(__dirname,"public")))*/

// Connect to MongoDB
await mongoose.connect(
  "mongodb+srv://victorugbede89:victoria%2C90@cluster0.k8mdo4j.mongodb.net/test"
);
console.log("MongoDB Connected");

app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type)
    .status(statusCode)
    .send(message)
}
// Routes
app.use("/", productRouter);

// Start server
app.listen(5000, () => {
  console.log("App running on port 5000");
});