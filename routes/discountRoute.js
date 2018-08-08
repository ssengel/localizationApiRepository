let discountController = require('../controllers/discountController');

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
