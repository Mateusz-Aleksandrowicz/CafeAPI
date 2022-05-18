const Castomer = require("../models/Castomer");
const router = require("express").Router();
const {verifyAuthorizationWithToken, verifyAdminWithToken} = require("./verifyToken");



//Castomer isUpdated
router.put("/:id", verifyAuthorizationWithToken, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_PASSWORD
      ).toString();
    }
  
    try {
      const updatedCastomer = await Castomer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCastomer);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
//Castomer isDeleted
router.delete("/:id", verifyAuthorizationWithToken, async (req, res) => {
    try {
      await Castomer.findByIdAndDelete(req.params.id);
      res.status(200).json("Castomer has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get castomer
  router.get("/:id", verifyAdminWithToken, async (req, res) => {
    try {
      const castomer = await Castomer.findById(req.params.id);
      const { password, ...others } = castomer._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  });


//Get castomers
  router.get("/", verifyAdminWithToken, async (req, res) => {
    try {
      const castomers = await Castomer.find();
      res.status(200).json(castomers);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  


module.exports = router