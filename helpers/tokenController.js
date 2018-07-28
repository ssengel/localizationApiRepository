// middleware for authentication
let jwt = require('jsonwebtoken');
let config = require('../config');

module.exports = async function authorize(req, res, next) {
  const apiToken = req.headers['x-access-token'];

  if (!apiToken) return res.status(401).send({ auth: false, message: 'Token Bulunamadi..' });
  
  jwt.verify(apiToken, config.apiKey, function (err, decodedUser) {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Token Dogrulamasi Basarisiz..' });
    }
    req.user = decodedUser;
  });

  next();
}


