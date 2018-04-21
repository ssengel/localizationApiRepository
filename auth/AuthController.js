let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let VerifyToken = require('./VerifyToken');
let User = require('../models/User');
let Config = require('../config');


//Login
router.post('/login', function (req, res) {
    User.findOne({ email: req.body.userName }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.\n' + err);
        if (!user) return res.status(404).send('Kullanici Bulunamadi.');

        //Parola dogrulama
        bcrypt.compareSync(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).send({ auth: false, token: null });
            } else {
                let token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ token: token });
            }
        });
    });
});


//Register 
router.post('/register', function (req, res) {

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        password: hashedPassword
    }, (err, user) => {
        if (err) return res.status(500).send(err.message);

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ token: token });
    });

});

module.exports = router;