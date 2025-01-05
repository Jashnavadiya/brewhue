const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`); // Use a secret key here
    
    
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

module.exports=authenticate;