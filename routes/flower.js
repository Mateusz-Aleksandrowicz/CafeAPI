const router = require("express").Router();
const Flower = require("../models/Flower");
const { verifyAdminWithToken} = require("./verifyToken");



 //Create flower
router.post("/", verifyAdminWithToken,  async (req,res)=>{
const newFlower = new Flower(req.body)
try {
    const savedFlower = await newFlower.save();
    res.status(200).json(savedFlower)
} catch (error) {
    res.status(500).json(error)
}
})


 //Update flower
router.put("/:id", verifyAdminWithToken, async (req, res) => {
  
    try {
      const updatedFlower = await Flower.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedFlower);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete flower
router.delete("/:id", verifyAdminWithToken, async (req, res) => {
    try {
      await Flower.findByIdAndDelete(req.params.id);
      res.status(200).json("Flower has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get flower
  router.get("/:id", async (req, res) => {
    try {
      const flower = await Flower.findById(req.params.id);
      res.status(200).json(flower);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get flowers
  router.get("/",  async (req, res) => {
    const flowerCategory = req.query.category;
    try {
      let flowers;
   if(flowerCategory){
        flowers = await Flower.find({categoriesl:{
              $in:[flowerCategory],
          },
    });
      }
    else{
          flowers = await Flower.find();
      }
      res.status(200).json(flowers);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 