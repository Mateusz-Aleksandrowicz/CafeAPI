const router = require("express").Router();
const Bill = require("../models/Bill");
const {verifyToken, verifyAuthorizationWithToken, verifyAdminWithToken} = require("./verifyToken");


 //Create bill
 router.post("/", verifyToken,  async (req,res)=>{
    const newBill= new Bill(req.body)
    try {
        const savedBill = await newBill.save();
        res.status(200).json(savedBill)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
     //Update bill
    router.put("/billById/:id", verifyAdminWithToken, async (req, res) => {
      
        try {
          const updatedBill = await Bill.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedBill);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
     //Delete bill
    router.delete("/billById/:id", verifyAdminWithToken, async (req, res) => {
        try {
          await Bill.findByIdAndDelete(req.params.id);
          res.status(200).json("Bill has been deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //Get bill
      router.get("/billById/:orderId", verifyAuthorizationWithToken , async (req, res) => {
        try {
          const bills = await Bill.find({orderId: req.params.orderId});
          res.status(200).json(bills);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //Get all bills
      router.get("/", verifyAdminWithToken, async (req, res) => {
       try {
           const bills = await Bill.find();
           res.status(200).json(bills);
       } catch (error) {
           res.status(500).json(error);
       }
      });

   

        //Get bill by date
      router.get("/billByDate", verifyAdminWithToken, async (req, res) => {
      
        try {
            const billByDate  =await Bill.find({
              createdAt:{$gte:req.query.startDate, $lte:req.query.endDate}
            }).limit(req.query.limit).sort({createdAt:"desc"});
           
            res.status(200).json(billByDate);
        } catch (error) {
            res.status(500).json(error);
        }
         
       });  

module.exports = router 