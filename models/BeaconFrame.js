var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeaconFrameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: Number,
    beacons: [{macAddress: String, name: String, rssi: Number}],
    recordTime:Number
},{versionKey: false});

module.exports = mongoose.model('BeaconFrame', BeaconFrameSchema);
