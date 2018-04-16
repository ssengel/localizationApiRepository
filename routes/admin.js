let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Admin = require('../models/Admin');


router.get('/:id/stores', (req, res) => {
    Admin.findOne({_id: req.params.id}).populate('stores','name').exec((err, stores) => {
        if(err){
            return res.status(500).send(err.message);
        }
        res.status(200).send(stores);
    });
});



module.exports = router;
