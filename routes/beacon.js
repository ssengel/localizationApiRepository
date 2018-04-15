let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Beacon = require('../models/Beacon');


router.post('/', (req, res) => {
    Beacon.create({
        _id: new mongoose.Types.ObjectId(),
        macAddress: req.body.macAddress,
        storeId:req.body.storeID,
        name: req.body.name
    },(err, beacon)=> {
        if(err){
            return res.status(500).send({status: 500, message: err});
        }
        res.status(200).send({status: 200, data: beacon});
    });
});

router.get('/', (req, res) => {
    Beacon.find({}, (err, beacons) => {
        if (err) {
            return res.status(500).send({status: 500, message: err});
        }
        res.status(200).send({status: 200, data: beacons});
    });
});


module.exports = router;