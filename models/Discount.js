let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DiscountSchema = new Schema({
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    title: String,
    content: String,
    discountRate: Number,
    createdAt: { type: String, default: new Date().toString() }
}, { versionKey: false });

module.exports = mongoose.model('Discount', DiscountSchema);