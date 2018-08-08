let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    storeId: {type: Schema.Types.ObjectId, ref: 'Store'},
    title: String,
    body: String,
    locaion: String,
    createdAt: {type: String, default:new Date().toString()}
}, {versionKey: false});

module.exports = mongoose.model('Notification', NotificationSchema);