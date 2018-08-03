// middleware for doing role-based permissions
module.exports = function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;
  //console.log(allowed)
  // return a middleware
  return (req, res, next) => {

    if (req.user && isAllowed(req.user.role))
      next(); // role is allowed, so continue on the next middleware
    else {
      return res.status(403).send({ message: "Forbidden" }); // user is forbidden
    }
  }
}