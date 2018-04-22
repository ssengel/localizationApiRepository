let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CompanySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    stores: [{type: Schema.Types.ObjectId, ref: 'Store'}]
}, {versionKey: false});

module.exports = mongoose.model('Company', CompanySchema);
