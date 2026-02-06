const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
  const token = req.header("token");
  if(!token) return res.status(401).send("No Token");

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){
    res.status(401).send("Invalid Token");
  }
}
