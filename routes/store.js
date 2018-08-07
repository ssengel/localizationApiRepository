let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let permit = require('../helpers/permission')
let Store = require('../models/Store');

//all stores
router.get('/', permit('admin','company'), (req, res)=>{
    Store.find({}, (err, stores) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(stores);
    });
})

// sadece bir magaza
router.get('/:id', permit('admin','company'), (req, res)=>{
    Store.findOne({_id: req.params.id}, (err, store) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(store);
    });
})

//bir magazanin butun bildirimleri
router.get('/:id/notification', permit('admin','company','normal'), (req, res) => {
    Store.findOne({_id: req.params.id}, (err, store) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(store.notifications);
    });
});
//bir magazanin bir tane bildirim // bu kisim ayrilabilir..

module.exports = router;