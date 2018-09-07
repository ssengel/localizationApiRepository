let discountDBO = require('../dbOperations/discountDBO');
let badRequest = require('../helpers/badRequestError');
//bu seviyedeki hatalar onceden tanimsiz ve istemciyi ilgilendiren hatalar.

exports.createDiscount = (req, res, next) => {

    const mDiscount = req.body;

    if (!mDiscount.title ||
        !mDiscount.content ||
        !mDiscount.discountRate
    ) {

        next(badRequest('Discount un Bazi Bilgileri Eksik !!'));
        return;
    }
    //diger kontroller ve  on islemlerde burada yapilabilir

    //kontroller basarili ise DBO islemini gercekle
    discountDBO.createDiscount(mDiscount)
        .then(discount => {
            res.status(200).send(discount);
        })
        .catch(err => {
            next(err);
        })

}