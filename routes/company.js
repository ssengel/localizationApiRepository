let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Company = require('../models/Company');
let Store = require('../models/Store');
let Counter = require('../models/Counter');
let permit = require('../helpers/permission');


//all Company
router.get('/',  permit("admin"), (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(companies);
    });
});

//single Company
router.get('/:id',  permit("admin","company"), (req, res) => {
    Company.findOne({ _id: req.params.id }, (err, company)=>{
        if (err) return res.status(500).send(err.message);
        res.status(200).send(company);
    })
})

//all stores of a company
router.get('/:id/store', permit('admin','company'), (req, res) => {
    Company.findOne({ _id: req.params.id }).
        populate('stores').
        exec((err, company) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send(company.stores);
        });
});

//store of a company
router.get('/:id/store/:storeId', permit('admin','company'), (req, res) => {
    Company.findOne({ _id: req.params.id }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        Store.findOne({ _id: req.params.storeId }, (err, store) => {
            if (!store) return res.status(500).send('Magaza bulunamadi !!');
            res.status(200).send(store);
        });
    });
});


// asagisi duzeltilmeli...

//Firmanin bir magazasina Kampanya Ekle
router.post('/store/:id/notification',(req, res) => {
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




//Magazanin name'i XXX olan  bildirimini  getirir
router.get('/store/:id/notification/:name', (req, res) => {
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");
        
        Store.findOne({ _id: req.params.id, 'notifications.name': req.params.name }, { "notifications.$": 1 }, (err, store) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(store.notifications[0]);
        });
    });
});

//Magazanin name'i XXX olan  bildirimi  gunceller
router.put('/store/:id/notification/:name', (req, res) => {
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


//Firma'ya ait Butun Kullanicilar
router.get('/',(req,res) =>{
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
router.get('/', (req,res) =>{
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        User.find({}, (err, users) =>{
            if (err) return res.status(500).send(err.message);
            res.status(200).send(users);
        });
    });
    
});

//Magazanin Son Counter Bilgisi
router.get('/store/:id/counter', (req,res) =>{
    Company.findOne({ _id: req.companyId }, (err, company) => {
        if (err) return res.status(500).send(err.message);
        if (!company) return res.status(404).send("Firma bulunamadi..");

        Store.findOne({ _id: req.params.id }, (err, store) => {
            if (err) return res.status(500).send(err.message);
            if (!store) return res.status(500).send('Magaza bulunamadi !!');
            
            Counter.find({storeId: req.params.id}).sort({createdAt: -1}).limit(1).exec((err, counter) =>{
                if (err) return res.status(500).send(err.message);
                res.status(200).send(counter[0]);
            });
        });
    });
    
});

// router.get('/store/:id/beaconframe', (req,res) => {
//     BeaconFrame.find({userId: req.params.beaconframe_id}).sort({$natural:-1}).limit(1).exec((err,beaconFrame) => {
//         if (err) return res.status(500).send("Hata oldu..");
//         res.status(200).send(beaconFrame);
//     });
// });

module.exports = router;
