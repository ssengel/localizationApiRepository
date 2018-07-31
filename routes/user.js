let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let PythonShell = require('python-shell');
let permit = require('../helpers/permission');
let multer = require('multer');

//multer setup

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'publicImages/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
}).single('photo');



//models
let User = require('../models/User');
let BeaconFrame = require('../models/BeaconFrame');
let Store = require('../models/Store');


//butun kullanicilar
router.get('/', permit('admin'), (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(users);
    });
});

//tek bir kullanici
router.get('/:id', permit('normal', 'company', 'admin'), (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(user);
    });
});

//image Upload
router.put('/:id/image', permit('normal', 'company', 'admin'), (req, res) => {
    let file = {};
    upload(req, res, function (uploadError) {
        if (uploadError)
            return res.status(422).send("resim yuklenirken hata meydana geldi !");
        else{
            file = req.file;
            User.findById(req.params.id,(err,user) =>{
                if(err) return res.status(433).send(err.message);
                user.image = {
                    originalname: file.originalname,
                    path: file.path
                } 
                user.save((err) =>{
                    if(err) return res.status(433).send(err)
                })
                return res.status(200).send(user);
            })
        }
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

let lastData = new Map();

router.post('/beaconframe', (req, res) => {
    if (req.body.beacons.length > 4) {
        let options = {
            mode: 'text', pythonPath: '/usr/bin/python', pythonOptions: ['-u'], scriptPath: __dirname,
            args: [
                req.body.beacons[0].macAddress, req.body.beacons[0].rssi,
                req.body.beacons[1].macAddress, req.body.beacons[1].rssi,
                req.body.beacons[2].macAddress, req.body.beacons[2].rssi,
                req.body.beacons[3].macAddress, req.body.beacons[3].rssi,
                req.body.beacons[4].macAddress, req.body.beacons[4].rssi
            ]
        };
        PythonShell.run('../knn.py', options, (err, konum) => {
            if (err) res.status(500).send(err.message);
            console.log(`Tahmin edilen konum: ${konum}`);

            BeaconFrame.create({
                _id: new mongoose.Types.ObjectId(),
                userId: req.body.userId,
                storeId: req.body.storeId,
                companyId: req.body.companyId,
                beacons: req.body.beacons,
                location: String(konum)
            }, (err, beaconFrame) => {
                if (err) return res.status(500).send(err.message);
                lastData.set(beaconFrame.userId, String(konum));
                res.status(200).send({ status: true, konum: String(konum) });
            })
        })
    } else {
        console.log(`${req.body.beacons.length} beacondan sinyan aliniyor..`);
        //let index = Math.ceil(Math.random()*6);
        //lastData.set(req.body.userId,positions[index])
        //console.log({status: true, konum:"C"});
        res.status(200).send({ status: true, konum: "C" });
    }
});


router.get('/beaconframe', (req, res) => {

    res.status(200).send(mapToObj(lastData))
    lastData.clear();
})

let positions = ["A", "B", "C", "D", "E", "F"]

function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function (value, key) {
        obj[key] = value
    });

    return obj;
}


//Butun BeaconFrameler
// router.get('/', function (req, res) {
//     BeaconFrame.find({}, function (err, beaconFrames) {
//         if (err) return res.status(500).send("BeaconFrame ler listelenirken bir problem oldu..");
//         res.status(200).send(beaconFrames);
//     });
// });



module.exports = router;
