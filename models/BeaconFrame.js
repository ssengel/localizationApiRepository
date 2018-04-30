let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BeaconFrameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    companyId: {type: Schema.Types.ObjectId, ref: 'Company'},
    beacons: Array,
    location: String,
    createdAt: { type: Date, default: Date.now }
},{versionKey: false});

module.exports = mongoose.model('BeaconFrame', BeaconFrameSchema);
