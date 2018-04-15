let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Admin = require('../models/Admin');
let Store = require('../models/Store');
let Beacon = require('../models/Beacon');

//token ile giris yapilmali
router.post('/admin', (req, res) => {
    Admin.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        stores:[]
    }, (err, admin) => {
        if(err){
            return res.status(500).send(err.message);
        }
        res.status(200).send(admin);
    });
});

router.post('/admin/store', (req, res) => {
    Store.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        map: req.body.map,
        dataSet: req.body.dataSet,
        notification: []
    }, (err, store) => {

        if(err) return res.status(500).send({status: 500, message: err});

        Admin.findOne({_id: req.body.adminId}, (err, admin) => {

            admin.stores.push(store._id);

            admin.save((err, adminStore) => {
                if (err) return res.status(500).send({status: 500, message: err});
                res.status(200).send({status: 200, data: store});
            });
        });
    });
});



router.post('/admin/store/beacon', (req, res) => {
    Beacon.create({
        _id: new mongoose.Types.ObjectId(),
        macAddress: req.body.macAddress,
        storeId:req.body.storeId,
        name: req.body.name
    },(err, beacon)=> {
        if(err){
            return res.status(500).send({status: 500, message: err});
        }
        res.status(200).send({status: 200, data: beacon});
    });
});

router.get('/admin', (req, res) => {
    Admin.find({}, (err, admins) => {
        if(err){
            return res.status(500).send(err.message);
        }
        res.status(200).send(admins);
    });
});

module.exports = router;
