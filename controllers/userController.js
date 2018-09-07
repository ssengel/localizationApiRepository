let mongoose = require('mongoose');
let multer = require('multer');
let imageUpload = require('../helpers/imageUpload');
let User = require('../models/User'); //DBO ya tasinmali


//all users
exports.getUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(users);
    });
};

//get user by id
exports.getUserById = (req, res, next) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(user);
    });
};

//upload user image
exports.uploadImage = (req, res, next) => {
    let file = {};
    imageUpload(req, res, function (uploadError) {
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
};






// //Mobil Tarafi

// //Firmanin bir magazasinin butun bildirimleri
// router.get('/notification', (req, res) => {
//     Store.findOne({ _id: req.query.storeId }, (err, store) => {
//         if (err) return res.status(500).send(err.message);
//         if (!store) return res.status(403).send('Magaza bulunamadi');
//         console.log(store.notifications)
//         res.status(200).send({ status: true, notifications: store.notifications })
        
//     })
// });



// // Kullanicinin tarama sonucu gonderdigi beaconFrame' kayit edilmesi

// let lastData = new Map();

// router.post('/beaconframe', (req, res) => {
//     if (req.body.beacons.length > 4) {
//         let options = {
//             mode: 'text', pythonPath: '/usr/bin/python', pythonOptions: ['-u'], scriptPath: __dirname,
//             args: [
//                 req.body.beacons[0].macAddress, req.body.beacons[0].rssi,
//                 req.body.beacons[1].macAddress, req.body.beacons[1].rssi,
//                 req.body.beacons[2].macAddress, req.body.beacons[2].rssi,
//                 req.body.beacons[3].macAddress, req.body.beacons[3].rssi,
//                 req.body.beacons[4].macAddress, req.body.beacons[4].rssi
//             ]
//         };
//         PythonShell.run('../knn.py', options, (err, konum) => {
//             if (err) res.status(500).send(err.message);
//             console.log(`Tahmin edilen konum: ${konum}`);

//             BeaconFrame.create({
//                 _id: new mongoose.Types.ObjectId(),
//                 userId: req.body.userId,
//                 storeId: req.body.storeId,
//                 companyId: req.body.companyId,
//                 beacons: req.body.beacons,
//                 location: String(konum)
//             }, (err, beaconFrame) => {
//                 if (err) return res.status(500).send(err.message);
//                 lastData.set(beaconFrame.userId, String(konum));
//                 res.status(200).send({ status: true, konum: String(konum) });
//             })
//         })
//     } else {
//         console.log(`${req.body.beacons.length} beacondan sinyan aliniyor..`);
//         //let index = Math.ceil(Math.random()*6);
//         //lastData.set(req.body.userId,positions[index])
//         //console.log({status: true, konum:"C"});
//         res.status(200).send({ status: true, konum: "C" });
//     }
// });


// router.get('/beaconframe', (req, res) => {

//     res.status(200).send(mapToObj(lastData))
//     lastData.clear();
// })

// let positions = ["A", "B", "C", "D", "E", "F"]

// function mapToObj(inputMap) {
//     let obj = {};

//     inputMap.forEach(function (value, key) {
//         obj[key] = value
//     });

//     return obj;
// }
