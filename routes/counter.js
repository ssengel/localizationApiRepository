let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Verify2 = require('../auth/VerifyToken2');
let Counter = require('../models/Counter');


router.post('/store/:id', function (req, res) {
    Counter.create({
        _id: new mongoose.Types.ObjectId(),
        storeId: req.params.id,
        totalPersonCount: req.body.totalPersonCount,
        currentPersonCount: req.body.currentPersonCount
    }, function (err, counter) {
        if (err) {
            return res.status(500).send(err);
        } else {
            console.log(counter)
            res.status(200).send(counter);
        }
    });
});

router.get('/store/:id',Verify2, function (req, res) {
    //Company ve Store Kontrolu
    Counter.find({}, function (err, counters) {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(counters);
        }
    });
});



module.exports = router;
