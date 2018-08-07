let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SchemaDiscount = new Schema({
    title: String,
    content: String,
    discountRate: Number,
    createdAt: { type: String, default: new Date().toString() }
}, { versionKey: false });

module.exports = mongoose.model('Discount', SchemaDiscount);