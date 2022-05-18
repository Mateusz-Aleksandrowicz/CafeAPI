const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require('./routes/auth');
const castomerRoute = require('./routes/castomer');
const flowerRoute = require('./routes/flower');
const orderRoute = require('./routes/order');
const billRoute = require('./routes/bill');


const app = express();
dotenv.config();


mongoose.connect(
    process.env.MONGO
    ).then(()=>console.log("Connection with database is successsfull."))
     .catch((error)=>{
         console.log(error);
     });

app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/castomer", castomerRoute);
app.use("/api/flower", flowerRoute);
app.use("/api/order", orderRoute);
app.use("/api/bill", billRoute);



app.listen(process.env.PORT , ()=>{
    console.log(`Server is running.`);
})