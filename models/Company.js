let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CompanySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    stores: [{type: Schema.Types.ObjectId, ref: 'Store'}],
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Company', CompanySchema);
