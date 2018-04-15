var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    age: Number,
    createdAt: { type: Date, default: Date.now }
},{versionKey : false});



module.exports = mongoose.model('User', UserSchema);
