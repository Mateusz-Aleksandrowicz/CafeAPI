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


const verifyAuthorizationWithToken = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.castomer.id === req.params.id || req.castomer.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not authorized to do that!");
      }
    });
  };

  const verifyAdminWithToken = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.castomer.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not an ADMIN and you can not to do that!");
      }
    });
  };

module.exports={verifyToken, verifyAuthorizationWithToken, verifyAdminWithToken};