let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Company = require('../models/Company');
let Store = require('../models/Store');
let Beacon = require('../models/Beacon');
let User = require('../models/User');
let Counter = require('../models/Counter');




//Firmaya Magaza Eklemek
router.post('/company/:id/store', (req, res) => {

    Company.findOne({ _id: req.params.id }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send('magaza bulunamadi..');

        Store.create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            map: req.body.map,
            dataSet: req.body.dataSet,
            notifications: []
        }, (err, store) => {
            if(err) return res.status(500).send(err.message);

            company.stores.push(store._id);
            company.save((err, mCompany) => {
                if (err) return res.status(500).send(err.message);
                res.status(200).send(store);
            });
        });
    });
});

//Firmaya ait magazalari goruntule
router.get('/company/:id/store', (req, res) => {
    Company.findOne({ _id: req.params.id }).populate('stores').exec((err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send('firma bulunamadi !!');
        res.status(200).send(company.stores);
    })
})

//Beacon Olusturmak
router.post('/store/:id/beacon', (req, res) => {

    Store.findOne({ _id: req.params.id }, (err, store) => {
        if (err) return res.status(500).send(err.message);
        if (!store) return res.status(404).send('Magaza bulunamadi');
        Beacon.create({
            _id: new mongoose.Types.ObjectId(),
            macAddress: req.body.macAddress,
            storeId: req.params.id,
            name: req.body.name,
            location: req.body.location
        }, (err, beacon) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(beacon);
        });
    })
});


module.exports = router;
