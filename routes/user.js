let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let User = require('../models/User');

//get all users
router.get('/',function(req,res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send('kullanicilar getirilemedi..');
        res.status(200).send(users);
    });
});



module.exports = router;
