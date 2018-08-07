let discount = require('./discount');

exports.mainRoute = (app) => {
    app.post('/discount', discount.createDiscount);
    //
}