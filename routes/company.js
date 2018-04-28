let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Verify2 = require('../auth/VerifyToken2');
let Company = require('../models/Company');
let Beacon = require('../models/Beacon');
let Store = require('../models/Store');



//Firmanin butun Magazalari
router.get('/store', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate('stores').
        exec((err, company) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send(company.stores);
        });
});

//Firmanin bir tane magazasi
router.get('/store/:id', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        Store.findOne({ _id: req.params.id }, (err, store) => {
            if (!store) return res.status(500).send('Magaza bulunamadi !!');
            res.status(200).send(store);
        });
    });
});

//Firmanin bir magazasina Kampanya Ekle
router.post('/store/:id/notification', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");
        notification = {
            name: req.body.name,
            declaration: req.body.declaration,
            location: req.body.location
        }
        Store.update({ _id: req.params.id }, { $push: { notifications: notification } }, (err, store) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send("Kampnay eklendi..");
        });
    });

});


//Firmanin bir magazasinin butun kampanyalari
router.get('/store/:id/notification', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }).
        populate({ path: 'stores', match: { _id: req.params.id } }).//bir tane magaza getirir
        exec((err, company) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(company.stores[0].notifications);
        });
});

//Magazanin name'i XXX olan  Kampanyasini  getirir
router.get('/store/:id/notification/:name', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        Store.findOne({ _id: req.params.id, 'notifications.name': req.params.name }, { "notifications.$": 1 }, (err, store) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(store.notifications[0]);
        });
    });

});

//Magazanin name'i XXX olan  Kampanyasini  gunceller
router.put('/store/:id/notification/:name', Verify2, (req, res) => {
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

            Store.findOneAndUpdate(
                { _id: req.params.id, 'notifications.name': req.params.name },
                {
                    $set: {
                        'notifications.$.name': req.body.name,
                        'notifications.$.decleration': req.body.declaration,
                        'notifications.$.location': req.body.location
                    }
                },
                {
                    projection:{
                        notifications : {
                            $elemMatch:{
                                name: req.body.name
                            }
                        }
                    },
                    new : true
                },
                (err, store) => {
                    if (err) return res.status(500).send(err.message);
                    if (!store) return res.status(404).send('Kampanya bulunamadi !!');
                    res.status(200).send(store.notifications[0]);
                });
    });
});

// Kullanicinin Firma Id bilgisini saklamasi gerekir
// Her firmanin bir uygulamasi oldugunu varsayiyoruz

//Firma'ya ait Butun Kullanicilar
router.get('/',Verify2, (req,res) =>{
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        User.find({}, (err, users) =>{
            if (err) return res.status(500).send(err.message);
            res.status(200).send(users);
        });
    });
    
});

//Firmanin Bir magazasinin Butun Kullanicilari
router.get('/',Verify2, (req,res) =>{
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        User.find({}, (err, users) =>{
            if (err) return res.status(500).send(err.message);
            res.status(200).send(users);
        });
    });
    
});
module.exports = router;
