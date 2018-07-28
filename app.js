let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let db = require('./db')
let app = express();
let tokenController = require('./helpers/tokenController');
let cors = require('cors');



//routes modules
let User = require('./routes/user');
let Store = require('./routes/store');
let Company = require('./routes/company');
let System = require('./routes/system');
let Auth = require('./routes/auth');



//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())


//routes
app.use('/auth', Auth);
app.use(tokenController);



app.use('/user', User);
app.use('/store', Store)
app.use('/company', Company);
app.use('/system', System);

module.exports = app;
