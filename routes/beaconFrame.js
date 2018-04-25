let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var PythonShell = require('python-shell');


let BeaconFrame = require('../models/BeaconFrame');


router.post('/', function (req, res) {
    BeaconFrame.create({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        storeId: req.body.storeId,
        beacons: req.body.beacons
    }, function (err, beaconFrame) {
        if (err) {
            return res.status(500).send(err.message);
        } else {
            if(req.body.beacons.length>3){
                let options = {
                    mode: 'text',
                    pythonPath: '/usr/bin/python',
                    pythonOptions: ['-u'],
                    scriptPath: __dirname,
                    args: [req.body.beacons[0].macAddress, req.body.beacons[0].rssi,
                    req.body.beacons[1].macAddress, req.body.beacons[1].rssi,
                    req.body.beacons[2].macAddress, req.body.beacons[2].rssi,
                    req.body.beacons[3].macAddress, req.body.beacons[3].rssi]
                };
                //console.log(options.args)
                PythonShell.run('../knn.py', options, (err, konum) => {
                    if (err){
                        res.status(500).send(err.message);
                        //console.log(err.message);
                    }
                    console.log(`Tahmin edilen konum: ${konum}`)
                    res.status(200).send(konum);
                });
            }else{
                console.log(`${req.body.beacons.length} beacondan sinyan aliniyor..`);
                res.status(403).send(`${req.body.beacons.length} beacondan sinyan aliniyor..`);
            }

        }

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
