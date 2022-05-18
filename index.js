const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();


mongoose.connect(
    process.env.MONGO
    ).then(()=>console.log("Connection with database is successsfull."))
     .catch((error)=>{
         console.log(error);
     });

app.use(express.json());


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running.`);
})