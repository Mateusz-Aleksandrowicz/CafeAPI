const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
    {
        castomerId:{type:String, required:true},
        flowers:[{
            flowerId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],
      amount:{type:Number, required:true},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Bill", BillSchema); 