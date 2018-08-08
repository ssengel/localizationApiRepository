let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let StoreSchema = new Schema({
    companyId: {type: Schema.Types.ObjectId, ref: 'Company'},
    name: String,
    phone: String,
    address: String,
    map: String,
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Store', StoreSchema);