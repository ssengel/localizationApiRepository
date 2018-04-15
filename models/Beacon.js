let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BeaconSchema = new Schema({
    _id: Schema.Types.ObjectId,
    macAddress: String,
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    name: String,
    createdAt: {type: Date, default: Date.now()}
}, {versionKey: false});

module.exports = mongoose.model('Beacon', BeaconSchema);