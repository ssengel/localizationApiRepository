let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('DisCount', new Scehema({
    _id: Schema.Types.ObjectId,
    title: String,
    declaration: String,    
    disCountRate: Number,
    createdAt: {type: Date, default: Date.now()}
},
{versionKey: false}));