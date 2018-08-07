let discountController = require('../controllers/discount');

exports.createDiscount = ((req, res, next) => {

    let discountData = req.body;

    discountController.createDiscount(discountData)
        .then(discount => {
            res.send(discount)
        })
        .catch(err => {
            next(err);
        })
})

exports.getAll = ((req, res, next) => {

})

exports.getById = ((req, res, next) => {

})

exports.findDiscount = ((req, res, next) => {

})
