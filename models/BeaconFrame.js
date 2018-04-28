let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BeaconFrameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    storeId: {type: String, default: '333'},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    companyId: {type: Schema.Types.ObjectId, ref: 'Company'},
    beacons: Array,
    createdAt: { type: Date, default: Date.now }
},{versionKey: false});

module.exports = mongoose.model('BeaconFrame', BeaconFrameSchema);
