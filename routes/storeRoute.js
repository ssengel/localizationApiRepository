let StoreController = require('../controllers/storeController');

//create a store
exports.createStore = ((req, res, next) => {

    let storeData = req.body;

    StoreController.createStore(storeData)
        .then(store => {
            res.send(store);
        })
        .catch(err => {
            next(err);
        })
})

//get all stores
exports.getAllStores = ((req, res, next) => {

    StoreController.getAllStores()
        .then(stores => {
            res.send(stores);
        })
        .catch(err => {
            next(err);
        })
})

//get a store
exports.getStoreById = ((req, res, next) => {

    let storeId = req.params.id;

    StoreController.getStoreById(storeId)
        .then(store => {
            res.send(store);
        })
        .catch(err => {
            next(err);
        })
})

//delete a store
exports.deleteStoreById = ((req, res, next) => {

    let storeId = req.params.id;

    StoreController.deleteStoreById(storeId)
        .then(store => {
            res.send(store);
        })
        .catch(err => {
            next(err);
        })
})

//get a notifications of store
exports.getAllNotificationsOfStoreById = ((req, res, next) => {

    let storeId = req.params.id;

    StoreController.getAllNotificationsOfStoreById(storeId)
        .then(notis => {
            res.send(notis);
        })
        .catch(err => {
            next(err);
        })
})

//get a discounts of store
exports.getAllDiscountsOfStoreById = ((req, res, next) => {

    let storeId = req.params.id;

    StoreController.getAllDiscountsOfStoreById(storeId)
        .then(discounts => {
            res.send(discounts);
        })
        .catch(err => {
            next(err);
        })
})