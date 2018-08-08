let Store = require('../models/Store');
let Notification = require('../models/Notification');
let Discount = require('../models/Discount');

exports.createStore = (storeData) => {

    let mStore = new Store(storeData);

    return new Promise((resolve, reject) => {
        mStore.save()
            .then(store => {
                resolve(store);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getAllStores = () => {
    return new Promise((resolve, reject) => {
        Store.find({})
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
        Store.findOne({ _id: storeId })
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
        Store.deleteOne({ _id: storeId })
            .then(store => {
                resolve(store);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getAllNotificationsOfStoreById = (storeId) =>{
    return new Promise((resolve, reject) => {
        Notification.find({ storeId: storeId})
            .then(notifications => {
                resolve(notifications);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getAllDiscountsOfStoreById = (storeId) =>{
    return new Promise((resolve, reject) => {
        Discount.find({ storeId: storeId})
            .then(discounts => {
                resolve(discounts);
            })
            .catch(err => {
                reject(err);
            })

    })
}