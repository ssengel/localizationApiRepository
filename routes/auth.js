let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');

let User = require('../models/User');


//Login User
router.post('/login', function (req, res) {

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).send('Sunucuda bir hata var.\n' + err);
        if (!user) return res.status(401).send({ auth: false, message: "Kullanici Bulunamadi !" });
        
        //Verify
        let result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) return res.status(401).send({ auth: false, message: "Sifre Dogrulanamadi !" });    
        
        //Create token
        let expire = 60*20;//20dk
        let token = jwt.sign(user.toJSON(), config.apiKey, { expiresIn: expire });
        
        res.status(200).send({ token: token, tokenExpire:expire, tokenCreatedAt:new Date().toString(), user: user});

    });
});

//Register User
router.post('/register', function (req, res) {

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        image: {
            orginalName:'default.jpeg',
            path: 'publicImages/default.jpeg'
        },
        role: "normal"
    }, (err, user) => {
        if (err) return res.status(500).send({ auth: false, message: err.message });
        res.status(200).send(user);
    });

});


module.exports = router;