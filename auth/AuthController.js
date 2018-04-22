let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let VerifyToken1 = require('./VerifyToken1');
let VerifyToken2 = require('./VerifyToken2');
let config = require('../config');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let User = require('../models/User');
let Company = require('../models/Company');

//Login User
router.post('/user/login', VerifyToken1, function (req, res) {
    User.findOne({ _id: req.userId }, function (err, user) {
        if (err) return res.status(500).send('Sunucuda bir hata var.\n' + err);
        if (!user) return res.status(404).send('Kullanici Bulunamadi.');

        //Parola dogrulama
        bcrypt.compareSync(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).send({ auth: false, token: null });
            } else {
                let token = jwt.sign({ id: user._id }, config.secretLevelOne, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ token: token });
            }
        });
    });
});

//login Firma
router.post('/company/login', VerifyToken2, (req, res) => {
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send('Kullanici adi veya sifre hatali..')
        //Parola dogrulama
        bcrypt.compareSync(req.body.password, company.password, (err, result) => {
            if (err) {
                return res.status(401).send({ auth: false, token: null });
            } else {
                let token = jwt.sign({ id: company._id }, config.secretLevelTwo, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ token: token });
            }
        });
    })
})

//Register 
router.post('/user/register', function (req, res) {

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

        let token = jwt.sign({ id: user._id }, config.secretLevelOne, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ token: token });
    });

});

//firma register
router.post('/company/register', (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Company.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        stores: []
    }, (err, company) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        let token = jwt.sign({ id: company._id }, config.secretLevelTwo, {
            expiresIn: 86400
        })
        res.status(200).send({ token: token });
    });
});

module.exports = router;