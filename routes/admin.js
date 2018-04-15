let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Admin = require('../models/Admin');


router.get('/:id/stores', (req, res) => {
    Admin.findOne({_id: req.params.id}).populate('stores','name').exec((err, stores) => {
        if(err){
            return res.status(500).send({status: 500,message: err});
        }
        res.status(200).send({status: 200, data:stores});
    });
});



module.exports = router;
