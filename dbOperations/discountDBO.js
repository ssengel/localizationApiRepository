let Discount = require('../models/Discount');

//bu seviyedeki hatalar onceden tanimli ve Sunucuyu ilgilendiren hatalar.
//create a new discount
exports.createDiscount = (discountData) => {

    let discount = new Discount(discountData);

    return new Promise((resolve, reject) => {
        discount.save()
            .then(discount => {
                resolve(discount);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//get all 
//get single
//put
//delete