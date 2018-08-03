let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../config');

let User = require('../models/User');


//Login User Mobil
router.post('/login', function (req, res) {

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return res.status(500).send('Sunucuda bir hata var.\n' + err);
        if (!user) return res.status(401).send({ auth: false, message: "Kullanici Bulunamadi !" });
        
        //Verify
        let result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) return res.status(401).send({ auth: false, message: "Sifre Dogrulanamadi !" });    
        
        //Create token 86400
        let token = jwt.sign(user.toJSON(), config.apiKey, { expiresIn: 60 });

        res.status(200).send({ auth: true, token: token, user: user, message: "Giris Basarili" });

    });
});

//Register User Mobil
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