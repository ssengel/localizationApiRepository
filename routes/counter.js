let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')


let Counter = require('../models/Counter')

router.get('/', function (req, res) {
    Counter.find({},function (err, counters) {
        if (err) {
            return res.status(500).send(err);
        }else {
            res.status(200).send(counters);
        }
    })
})

router.post('/',function(req, res) {
    Counter.create({
        _id : new mongoose.Types.ObjectId(),
        magazaId: req.body.magazaId,
        totalPersonCount: req.body.totalPersonCount,
        currentPersonCount: req.body.currentPersonCount,
        recordTime: new Date()
    },function(err, counter) {
        if (err) {
            return res.status(500).send(err);
        }else {
            res.status(200).send(counter);
        }
    })
})


module.exports = router;
