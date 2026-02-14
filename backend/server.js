import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Stripe from "stripe";
import productRouter from "./routes/productRoutes.js"; // your existing product routes
import checkoutRouter from "./routes/paymentRoutes.js"; // we’ll create this
import 'dotenv/config';


const app = express();
app.use(cors());
app.use(express.json());

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

const myLogger = function (req, res, next) {
console.log('LOGGED')
next()
}

const requestTime = function (req, res, next) {
  const date = new Date()
req.requestTime = date.toDateString()

next()
}
//Which of the middleware are we gonna use
app.use(myLogger)
app.use(requestTime)

app.get('/hello', (req, res) => {
let responseText = 'Hello World!'
responseText += `Requested at: ${req.requestTime}`
/*res.sendStatus(200,'application/json',{"message":responseText})*/
})


// Start server
app.listen(5000, () => {
  console.log("App running on port 5000");
});