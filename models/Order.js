const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
      status:{type:String, default:"Your order is being prepared."},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Order", OrderSchema);