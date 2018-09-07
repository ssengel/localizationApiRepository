let express = require('express');
let app = express();
let db = require('./db')
let bodyParser = require('body-parser');
let morgan = require('morgan');//logger
let tokenController = require('./helpers/tokenController');
let cors = require('cors');
let path = require('path');
let routes = require('./routes/mainRoute');
//routes modules
// let User = require('./routes/user');
// let Store = require('./routes/store');
// let Company = require('./routes/company');
// let System = require('./routes/system');
// let Auth = require('./routes/auth');
// let Discount = require('./routes/discount');




//middleware
app.use("/publicImages", express.static(path.resolve(__dirname, 'publicImages')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())

app.use(tokenController);


//routes
routes.mainRoute(app);

//last error handling
app.use((err, req, res, next) => { 
    res.status(err.status || 500);
    res.send(err.message);
})

module.exports = app;
