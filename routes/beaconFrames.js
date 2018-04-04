var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')


var BeaconFrame = require('../models/BeaconFrame')

var realTimeData = {};



router.post('/', function (req, res) {

    realTimeData[String(req.body.userId)] = req.body;

    BeaconFrame.create({
            _id: new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            beacons : req.body.beacons
        },
        function (err, beaconFrame) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(beaconFrame);
    });
});

router.get('/', function (req, res) {
    BeaconFrame.find({}, function (err, beaconFrames) {
        if (err) return res.status(500).send("BeaconFrame ler listelenirken bir problem oldu..");
        res.status(200).send(beaconFrames);
    });
});


// router.get('/:beaconframe_id',function(req,res){
//
//     BeaconFrame.find({userId: req.params.beaconframe_id} ,function (err,beaconFrame) {
//         if (err) return res.status(500).send("Hata oldu..");
//         res.status(200).send(beaconFrame);
//     });
// });

router.get('/:beaconframe_id/last',function (req,res) {
    BeaconFrame.find({userId: req.params.beaconframe_id}).sort({$natural:-1}).limit(1).exec(function (err,beaconFrame) {
        if (err) return res.status(500).send("Hata oldu..");
        res.status(200).send(beaconFrame);
    });
});


router.get('/allUsers',function (req, res) {
    res.send(realTimeData);

});



module.exports = router;