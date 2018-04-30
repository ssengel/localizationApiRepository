let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let PythonShell = require('python-shell');

//auth
let Verify1 = require('../auth/VerifyToken1');

//models
let User = require('../models/User');
let BeaconFrame = require('../models/BeaconFrame');
let Store = require('../models/Store');

//Kullanicinin bilgileri
router.get('/', Verify1, (req, res) => {
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err) return res.status(500).send(err.message);
        if (!user) return res.status(404).send('Kullanici bulunamadi');

        res.status(200).send(user);
    });
});

//Firmanin bir magazasinin butun bildirimleri
router.get('/notification', (req, res) => {
    // User.findOne({ _id: req.userId }, (err, user) => {
    //     if (err) return res.status(500).send(err.message);
    //     if (!user) return res.status(404).send('Kullanici bulunamadi');
    Store.findOne({ _id: req.query.storeId }, (err, store) => {
        if (err) return res.status(500).send(err.message);
        if (!store) return res.status(403).send('Magaza bulunamadi');
        console.log(store.notifications)
        res.status(200).send({ status: true, notifications: store.notifications })

    })
    //});
});


// Verify1 uygulanmali
// Kullanicinin tarama sonucu gonderdigi beaconFrame' kayit edilmesi
router.post('/beaconframe', (req, res) => {

    if (req.body.beacons.length > 3) {
        let options = {
            mode: 'text', pythonPath: '/usr/bin/python', pythonOptions: ['-u'], scriptPath: __dirname,
            args: [
                req.body.beacons[0].macAddress, req.body.beacons[0].rssi,
                req.body.beacons[1].macAddress, req.body.beacons[1].rssi,
                req.body.beacons[2].macAddress, req.body.beacons[2].rssi,
                req.body.beacons[3].macAddress, req.body.beacons[3].rssi
            ]
        };
        PythonShell.run('../knn.py', options, (err, konum) => {
            if (err) res.status(500).send(err.message);
            console.log(`Tahmin edilen konum: ${konum}`);
            //res.status(200).send({ status: true, konum: String(konum) });
            BeaconFrame.create({
                _id: new mongoose.Types.ObjectId(),
                userId: req.body.userId,
                storeId: req.body.storeId,
                companyId: req.body.companyId,
                beacons: req.body.beacons,
                location: String(konum)
            }, (err, beaconFrame) =>{
                if (err) return res.status(500).send(err.message);
                res.status(200).send({ status: true, konum: String(konum) });
            })
        });
    } else {
        console.log(`${req.body.beacons.length} beacondan sinyan aliniyor..`);
        res.status(403).send(`${req.body.beacons.length} beacondan sinyan aliniyor..`);

    }


    // BeaconFrame.create({
    //     _id: new mongoose.Types.ObjectId(),
    //     userId: req.body.userId,
    //     storeId: req.body.storeId,
    //     companyId: req.body.companyId,
    //     beacons: req.body.beacons
    // }, function (err, beaconFrame) {
    //     if (err) {
    //         return res.status(500).send(err.message);
    //     } else {
    //         // if (req.body.beacons.length > 3) {
    //         //     let options = {
    //         //         mode: 'text', pythonPath: '/usr/bin/python', pythonOptions: ['-u'], scriptPath: __dirname,
    //         //         args: [
    //         //             req.body.beacons[0].macAddress, req.body.beacons[0].rssi,
    //         //             req.body.beacons[1].macAddress, req.body.beacons[1].rssi,
    //         //             req.body.beacons[2].macAddress, req.body.beacons[2].rssi,
    //         //             req.body.beacons[3].macAddress, req.body.beacons[3].rssi
    //         //         ]
    //         //     };
    //         //     PythonShell.run('../knn.py', options, (err, konum) => {
    //         //         if (err) res.status(500).send(err.message);
    //         //         console.log(`Tahmin edilen konum: ${konum}`);
    //         //         res.status(200).send({status: true, konum: String(konum)});
    //         //     });
    //         // } else {
    //         //     console.log(`${req.body.beacons.length} beacondan sinyan aliniyor..`);
    //         //     res.status(403).send(`${req.body.beacons.length} beacondan sinyan aliniyor..`);

    //         // }
    //         res.status(200).send({ status: true, konum: 'C' });
    //     }
    // });
});



//Butun BeaconFrameler
// router.get('/', function (req, res) {
//     BeaconFrame.find({}, function (err, beaconFrames) {
//         if (err) return res.status(500).send("BeaconFrame ler listelenirken bir problem oldu..");
//         res.status(200).send(beaconFrames);
//     });
// });

// router.get('/:beaconframe_id/last',function (req,res) {
//     BeaconFrame.find({userId: req.params.beaconframe_id}).sort({$natural:-1}).limit(1).exec(function (err,beaconFrame) {
//         if (err) return res.status(500).send("Hata oldu..");
//         res.status(200).send(beaconFrame);
//     });
// });

module.exports = router;
