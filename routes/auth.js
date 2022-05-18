const router = require("express").Router();
const Castomer = require("../models/Castomer");
const CryptoJS = require("crypto-js");


//isRegistered

router.post("/register", async (req, res)=>{
    const newCastomer = new Castomer({
        username:req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD).toString(),
        email:req.body.email,
    });
    try{
        const savedCastomer=  await newCastomer.save()
        res.status(200).json(savedCastomer) 
    }
    catch(error){
        res.status(500).json(error);
    }
   
});

module.exports = router