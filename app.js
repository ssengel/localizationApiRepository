let express = require('express');
let bodyParser = require('body-parser');
let db = require('./db')
let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
let BeaconFrame = require('./routes/beaconFrame');
let User = require('./routes/user');
let Counter = require('./routes/counter');
let Admin = require('./routes/admin');
let Beacon = require('./routes/beacon');
let System = require('./routes/system');

//
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})



app.use('/beaconFrames',BeaconFrame);
app.use('/user',User);
app.use('/counter', Counter);
app.use('/system', System);

module.exports = app;
