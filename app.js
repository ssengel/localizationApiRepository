let express = require('express');
let app = express();
let db = require('./db')
let bodyParser = require('body-parser');
let morgan = require('morgan');//logger
let tokenController = require('./helpers/tokenController');
let cors = require('cors');
let path = require('path');



//routes modules
let User = require('./routes/user');
let Store = require('./routes/store');
let Company = require('./routes/company');
let System = require('./routes/system');
let Auth = require('./routes/auth');



//middleware
app.use("/publicImages", express.static(path.resolve(__dirname, 'publicImages')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())
app.use(tokenController);


//routes

app.use('/auth', Auth);
app.use('/user', User);
app.use('/store', Store)
app.use('/company', Company);
app.use('/system', System);

module.exports = app;
