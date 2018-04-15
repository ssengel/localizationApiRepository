let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let BeaconFrame = require('../models/BeaconFrame');


router.post('/', function (req, res) {
    BeaconFrame.create({
            _id: new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            beacons : req.body.beacons
    },function (err, beaconFrame) {
            if (err) return res.status(500).send(err);
            res.status(200).send(beaconFrame);
    });
});

router.get('/', function (req, res) {
    BeaconFrame.find({}, function (err, beaconFrames) {
        if (err) return res.status(500).send("BeaconFrame ler listelenirken bir problem oldu..");
        res.status(200).send(beaconFrames);
    });
});

// router.get('/:beaconframe_id/last',function (req,res) {
//     BeaconFrame.find({userId: req.params.beaconframe_id}).sort({$natural:-1}).limit(1).exec(function (err,beaconFrame) {
//         if (err) return res.status(500).send("Hata oldu..");
//         res.status(200).send(beaconFrame);
//     });
// });



module.exports = router;
