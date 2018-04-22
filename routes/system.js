let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Company = require('../models/Company');
let Store = require('../models/Store');
let Beacon = require('../models/Beacon');


//Firma Olusturmak
router.post('/company', (req, res) => {
    Company.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        stores: []
    }, (err, Company) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(Company);
    });
});

//Magaza Olusturmak
router.post('/company/store', (req, res) => {
    Store.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        map: req.body.map,
        dataSet: req.body.dataSet,
        notification: []
    }, (err, store) => {

        if (err) return res.status(500).send(err.message);

        Company.findOne({ _id: req.body.companyId }, (err, company) => {

            company.stores.push(store._id);

            company.save((err, companyStore) => {
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
router.post('/company/store/beacon', (req, res) => {

    Store.findOne({ _id: req.body.storeId }, (err, store) => {
        if (err) return res.status(500).send(err.message);
        if (!store) return res.status(404).send('Magaza bulunamadi');
        Beacon.create({
            _id: new mongoose.Types.ObjectId(),
            macAddress: req.body.macAddress,
            storeId: req.body.storeId,
            name: req.body.name
        }, (err, beacon) => {
            if (err)
                return res.status(500).send(err.message);
            res.status(200).send(beacon);
        });
    })
});

//magazaya ait beaconlari goruntule
router.get('/company/store/:id/beacon', (req, res) => {
    Store.findOne({ _id: req.params.id }, (err, store) => {
        if (err) return res.status(500).send(err.message);
        if (!store) return res.status(404).send('Magaza bulunamadi !!');
        Beacon.find({ storeId: req.params.id }, (err, beacons) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(beacons);
        })
    })
})

//firmalari listele
router.get('/company', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send(companies);
    });
});



module.exports = router;
