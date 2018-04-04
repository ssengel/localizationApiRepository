var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
    name: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    recordTime: Date
},{versionKey : false});



module.exports = mongoose.model('User', UserSchema);
