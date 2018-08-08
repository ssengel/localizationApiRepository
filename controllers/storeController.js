let StoreDBO = require('../dbOperations/storeDBO');
let badRequest = require('../helpers/badRequestError');
//bu seviyedeki hatalar onceden tanimsiz ve istemciyi ilgilendiren hatalar.

exports.createStore = (storeData) => {
    return new Promise((resolve, reject) => {
        if (!storeData.companyId ||
            !storeData.name ||
            !storeData.phone ||
            !storeData.map ||
            !storeData.address
        ) {
            reject(badRequest('Magazanin Bazi Bilgileri Eksik !!'));
            return;
        }


        //kontroller basarili ise DBO islemini gercekle
        StoreDBO.createStore(storeData)
            .then(store => {
                resolve(store);
            })
            .catch(err => {
                reject(err);
            })

    });
}

exports.getAllStores = () => {
    return new Promise((resolve, reject) => {

        StoreDBO.getAllStores()
            .then(stores => {
                resolve(stores);
            })
            .catch(err => {
                reject(err);
            })
    })

}

exports.getStoreById = (storeId) => {
    return new Promise((resolve, reject) => {

        StoreDBO.getStoreById(storeId)
            .then(store => {
                resolve(store);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.deleteStoreById = (storeId) => {
    return new Promise((resolve, reject) => {
        StoreDBO.deleteStoreById(storeId)
            .then(store => {
                resolve(store);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getAllNotificationsOfStoreById = (storeId) => {
    return new Promise((resolve, reject) => {

        StoreDBO.getAllNotificationsOfStoreById(storeId)
            .then(notifications => {
                resolve(notifications);
            })
            .catch(err => {
                reject(err);
            })

    })
}


exports.getAllDiscountsOfStoreById = (storeId) => {
    return new Promise((resolve, reject) => {

        StoreDBO.getAllDiscountsOfStoreById(storeId)
            .then(discounts => {
                resolve(discounts);
            })
            .catch(err => {
                reject(err);
            })

    })
}