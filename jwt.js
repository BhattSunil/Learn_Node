const jwt=require('jsonwebtoken')
const jwtAuthMiddleware = (req,res,next)=>{

const token= req.headers.authorizatton.split(' ')[1];
if(!token){return res.status(401).json({error:"Unauthorized"})}
  try{
   //Verify the token
   const decoded =jwt.verify(token ,process.env.JWT_SECRET);
   req.user = decoded;
   next()
  }
  catch(err){
    console.err(err)
    res.status(401).json({error:"Invalid Token"})
  }
}

// Function to generate token
const generateToken =(userData)=>{
  //Genrate new token using user data
  return jwt.sign(userData,process.env.JWT_SECRET);
}

modules.export =jwtAuthMiddleware,generateToken;