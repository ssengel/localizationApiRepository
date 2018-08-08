let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CompanySchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Company', CompanySchema);
