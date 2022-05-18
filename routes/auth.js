const router = require("express").Router();
const Castomer = require("../models/Castomer");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


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



//isLoggedIn
router.post("/login", async(req,res)=>{
    try{
        const castomer = await Castomer.findOne(
            {
                username: req.body.username
            }
        );

        if(!castomer){
            res.status(401).json("Wrong username.");
        } 

        const descryptedPassword = CryptoJS.AES.decrypt(
            castomer.password,
            process.env.SECRET_PASSWORD
        );

        const password = descryptedPassword.toString(CryptoJS.enc.Utf8)

        if(password!==req.body.password){
            res.status(401).json("Wrong password.");
        }
        const jwtToken = jwt.sign({
            id:castomer._id,
            isAdmin: castomer.isAdmin,
            
        }, process.env.JWT,
        {expiresIn:"3d"}
        );


        const {newPassword, ...others}=castomer._doc;
        res.status(200).json({...others, jwtToken});


    }
   
    catch(error){
        res.status(400).json(error)
    }
})

module.exports = router