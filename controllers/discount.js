let discountDBO = require('../dbOperations/discount');

//bu seviyedeki hatalar onceden tanimsiz ve istemciyi ilgilendiren hatalar.
let _err = new Error();
_err.status = 400;

exports.createDiscount = (discountData) => {
    return new Promise((resolve, reject) => {
        if (!discountData.title ||
            !discountData.content ||
            !discountData.discountRate
        ) {
            _err.message = "Alanlar Bos Gecilemez !!!";
            reject(_err);
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