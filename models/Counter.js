var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    magazaId: Number,
    totalPersonCount: Number,
    currentPersonCount: Number,
    recordTime: Date
},{versionKey : false});

module.exports = mongoose.model('Counter', CounterSchema);
