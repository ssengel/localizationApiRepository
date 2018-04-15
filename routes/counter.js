let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let Counter = require('../models/Counter')


router.post('/', function (req, res) {
    Counter.create({
        _id: new mongoose.Types.ObjectId(),
        storeId: req.body.storeId,
        totalPersonCount: req.body.totalPersonCount,
        currentPersonCount: req.body.currentPersonCount
    }, function (err, counter) {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(counter);
        }
    });
});

router.get('/', function (req, res) {
    Counter.find({}, function (err, counters) {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(counters);
        }
    });
});




module.exports = router;
