module.exports = function permit(...allowed) {
  
  const isAllowed = role => allowed.indexOf(role) > -1;
 
  return (req, res, next) => {

    if (req.user && isAllowed(req.user.role))
      next(); 
    else {
      return res.status(403).send({ message: "Forbidden" }); 
    }
  }
}