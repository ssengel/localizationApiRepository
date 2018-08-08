let discountDBO = require('../dbOperations/discountDBO');
let badRequest = require('../helpers/badRequestError');
//bu seviyedeki hatalar onceden tanimsiz ve istemciyi ilgilendiren hatalar.

exports.createDiscount = (discountData) => {
    return new Promise((resolve, reject) => {
        if (!discountData.title ||
            !discountData.content ||
            !discountData.discountRate
        ) {

            reject(badRequest('Discount un Bazi Bilgileri Eksik !!'));
            return;
        }
        //diger kontroller ve  on islemlerde burada yapilabilir



        
        //kontroller basarili ise DBO islemini gercekle
        discountDBO.createDiscount(discountData)
            .then(discount => {
                resolve(discount);
            })
            .catch(err => {
                reject(err);
            })

    });
}