const router = require("express").Router();
const Order = require("../models/Order");
const {verifyToken, verifyAuthorizationWithToken, verifyAdminWithToken} = require("./verifyToken");


 //Create order
 router.post("/", verifyToken,  async (req,res)=>{
    const newOrder= new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
    //Update order
    router.put("/:id", verifyAuthorizationWithToken, async (req, res) => {
      
        try {
          const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedOrder);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
    //Delete order
    router.delete("/:id", verifyAuthorizationWithToken, async (req, res) => {
        try {
          await Order.findByIdAndDelete(req.params.id);
          res.status(200).json("Flowers in bill has been deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //Get order
      router.get("/:castomerId", verifyAuthorizationWithToken , async (req, res) => {
        try {
          const order= await Order.findOne({castomerId: req.params.castomerId});
          res.status(200).json(order);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //Get all orders
      router.get("/", verifyAdminWithToken, async (req, res) => {
       try {
           const orders = await Order.find();
           res.status(200).json(orders);
       } catch (error) {
           res.status(500).json(error);
       }
      });
      


module.exports = router