const mongoose = require("mongoose");

const FlowerSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        categories:{type:Array, required:true},
        withOrnaments:{
            type:Boolean,
            default:false,
        },
        price:{type:Number, required:true}  
    },
    {timestamps:true}
)
module.exports = mongoose.model("Flower", FlowerSchema); 