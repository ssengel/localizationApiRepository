let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let db = require('./db')
let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
let BeaconFrame = require('./routes/beaconFrame');
let User = require('./routes/user');
let Counter = require('./routes/counter');
let Company = require('./routes/company');
let Beacon = require('./routes/beacon');
let System = require('./routes/system');
let Auth = require('./auth/AuthController');


//access control
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token')
    next()
})


//log
app.use(morgan('dev'));



app.use('/user/beaconframe', BeaconFrame);
app.use('/user', User);
app.use('/counter', Counter);
app.use('/system', System);
app.use('/company', Company);
app.use('/auth', Auth);

module.exports = app;
