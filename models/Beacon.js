let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BeaconSchema = new Schema({
    _id: Schema.Types.ObjectId,
    macAddress: String,
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    name: String,
    location: String,
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Beacon', BeaconSchema);
