let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Beacon = require('../models/Beacon');


router.get('/', (req, res) => {
    Beacon.find({}, (err, beacons) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send(beacons);
    });
});


module.exports = router;