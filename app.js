let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let db = require('./db')
let app = express();

//routes modules
let User = require('./routes/user');
let Counter = require('./routes/counter');
let Company = require('./routes/company');
let System = require('./routes/system');
let Auth = require('./auth/AuthController');


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token')
    next()
});

//routes
app.use('/auth', Auth);
app.use('/counter', Counter);
app.use('/user', User);
app.use('/company', Company);
app.use('/system', System);

module.exports = app;
