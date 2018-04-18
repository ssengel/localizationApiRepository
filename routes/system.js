let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Admin = require('../models/Admin');
let Store = require('../models/Store');
let Beacon = require('../models/Beacon');

//Admin-Firma Olusturmak
router.post('/admin', (req, res) => {
    Admin.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        stores: []
    }, (err, admin) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send(admin);
    });
});
//Magaza Olusturmak
router.post('/admin/store', (req, res) => {
    Store.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        map: req.body.map,
        dataSet: req.body.dataSet,
        notification: []
    }, (err, store) => {

        if (err) return res.status(500).send(err.message);

        Admin.findOne({ _id: req.body.adminId }, (err, admin) => {

            admin.stores.push(store._id);

            admin.save((err, adminStore) => {
                if (err) return res.status(500).send(err.message);
                res.status(200).send(store);
            });
        });
    });
});

//Beacon Olusturmak
router.post('/admin/store/beacon', (req, res) => {

    Store.findOne({ _id: req.body.storeId }, (err, store) => {
        if (err) return res.status(500).send(err.message);
        if (!store) res.status(404).send('Magaza bulunamadi');
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


//firmalari listele
router.get('/admin', (req, res) => {
    Admin.find({}, (err, admins) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send(admins);
    });
});

//firma girisi yap
router.post('/admin/login', (req, res) => {
    Admin.findOne({ userName: req.body.userName, password: req.body.password }, (err, admin) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(admin);
    })
})

module.exports = router;
