let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CounterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    totalPersonCount: Number,
    currentPersonCount: Number,
    createdAt: { type: Date, default: Date.now }
},{versionKey : false});

module.exports = mongoose.model('Counter', CounterSchema);

