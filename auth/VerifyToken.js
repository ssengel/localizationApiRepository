let jwt = require('jsonwebtoken');
let config = require('../config');


module.exports = (req, res, next) => {
    let token = req.header['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Token Bulunamadi..' });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Token Dogrulamasi Basarisiz..' });
        }
        req.userId = decoded.id;
        next();
    });
}