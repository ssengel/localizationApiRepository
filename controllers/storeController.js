let StoreDBO = require('../dbOperations/storeDBO');
let badRequest = require('../helpers/badRequestError');
//bu seviyedeki hatalar onceden tanimsiz ve istemciyi ilgilendiren hatalar.

exports.createStore = (req, res, next) => {

    const mStore = req.body;

    if (!mStore.companyId ||
        !mStore.name ||
        !mStore.phone ||
        !mStore.map ||
        !mStore.address
    ) {
        reject(badRequest('Magazanin Bazi Bilgileri Eksik !!'));
        return;
    }


    //kontroller basarili ise DBO islemini gercekle
    StoreDBO.createStore(mStore)
        .then(store => {
            res.status(200).send(store);
        })
        .catch(err => {
            next(err);
        })


}

exports.getStores = (req, res, next) => {

    StoreDBO.getAllStores()
        .then(stores => {
            res.status(200).send(stores);
        })
        .catch(err => {
            next(err);
        })

}

exports.getStoreById = (req, res, next) => {

    const mStoreId = req.params.id;

    StoreDBO.getStoreById(mStoreId)
        .then(store => {
            res.status(200).send(store);
        })
        .catch(err => {
            next(err);
        })

}

exports.deleteStoreById = (req, res, next) => {
    const mStoreId = req.params.id;

    StoreDBO.deleteStoreById(mStoreId)
        .then(store => {
            res.status(200).send(store);
        })
        .catch(err => {
            next(err);
        })
}

exports.getNotificationsOfStore = (req, res, next) => {

    const mStoreId = req.params.id;

    StoreDBO.getAllNotificationsOfStoreById(mStoreId)
        .then(notifications => {
            res.status(200).send(notifications);
        })
        .catch(err => {
            next(err);
        })

}


exports.getDiscountsOfStore = (req, res, next) => {

    const mStoreId = req.params.id;

    StoreDBO.getAllDiscountsOfStoreById(mStoreId)
        .then(discounts => {
            res.status(200).send(discounts);
        })
        .catch(err => {
            next(err);
        })

}