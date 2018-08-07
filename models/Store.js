let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let StoreSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    map: {type: String, default: 'haritaYolu'},
    dataSet: {type: String, default: 'veriSetiYolu'},
    notifications: [{name: String, declaration: String, location: String}],
    discounts: [{type: Schema.Types.ObjectId, ref: 'Discount'}],
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Store', StoreSchema);