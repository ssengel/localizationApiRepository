let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Verify2 = require('../auth/VerifyToken2');

let Company = require('../models/Company');
let Beacon = require('../models/Beacon');
let Beacon = require('../models/Store');

//Firmanin butun Magazalari
router.get('/store', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate('stores').
        exec((err, stores) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send(stores);
        });
});

//Firmanin bir tane magazasi
router.get('/store/:id', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate({ path: 'stores', match: { _id: req.params.id } }).
        exec((err, store) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send(store);
        });
});

//Firmanin bir magazasina Kampanya Ekle
router.post('/store/:id/notification', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate({ path: 'stores', match: { _id: req.params.id } }).
        exec((err, store) => {
            if (err) return res.status(500).send(err.message);
            store.notifications.push({
                name: req.body.name,
                declaration: req.body.declaration,
                location: req.body.location
            });
            store.save((err, mStore) => {
                if (err) return res.status(500).send(err.message);
                res.status(200).send(mStore.notifications);
            })
        })
});


//Firmanin bir magazasinin butun kampanyalari
router.get('/store/:id/notification', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate({ path: 'stores', match: { _id: req.params.id } }).
        exec((err, store) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(store.notifications);
        });
});

//Firmanin bir magazasinin bir tane Kampanyasi name e gore getirir
router.get('/store/:id/notification/:name', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate({ path: 'stores', match: { _id: req.params.id } }).
        exec((err, store) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(store.notifications[req.params.name]);
        });
});


module.exports = router;
