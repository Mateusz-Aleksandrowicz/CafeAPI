const jwt = require("jsonwebtoken");


const verifyToken = (req,res, next)=>{
    const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT, (error, castomer) => {
      if (error) {
          res.status(403).json("This token is valid!");
      }
      req.castomer = castomer;   
      next();
      
    });
   
  } else {
  
   res.status(401).json("You are unauthorized castomer.");

  }
}
module.exports={verifyToken};