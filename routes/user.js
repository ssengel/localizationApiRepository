let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let User = require('../models/User');

//token ile kayit edilmeli
router.post('/',(req,res) => {
    //ayni isim, email de kullanici varmi kontrolu
    User.create({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password

    }, function (err, user) {
        if (err) return res.status(500).send('hata olustu');
        res.status(200).send(user)
    });
});

//check user login
router.post('/login',(req,res) => {

    User.findOne({userName: req.body.userName, password: req.body.password}, function (err, user) {
        if (err) return res.status(500).send('hata olustu');
        if (!user) return res.status(200).send({status: false});
        let info = {
            status: true,
            name: user.name,
            lastName: user.lastName,
            _id: user._id
        };
        res.status(200).send(info);
    });

});

//get all users
router.get('/',function(req,res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send('kullanicilar getirilemedi..');
        res.status(200).send(users);
    });
});



module.exports = router;
