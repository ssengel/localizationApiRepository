var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeaconFrameSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    beacons: Array,
    recordTime:Number
},{versionKey: false});

module.exports = mongoose.model('BeaconFrame', BeaconFrameSchema);
