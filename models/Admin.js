let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    stores: [{type: Schema.Types.ObjectId, ref: 'Store'}]
}, {versionKey: false});

module.exports = mongoose.model('Admin', AdminSchema);
