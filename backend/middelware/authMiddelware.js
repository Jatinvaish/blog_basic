const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {

  //get the token from header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token if exist
  try {
    const decoded = JWT.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
