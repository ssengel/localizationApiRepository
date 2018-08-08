let discount = require('./discountRoute');
let company = require('./companyRoute');
let store = require('./storeRoute');
let notification = require('./notificationRoute');

exports.mainRoute = (app) => {
    //company
    app.post('/company', company.createCompany)
        .get('/company', company.getAllCompanies)
        .get('/company/:id', company.getCompanyById)
        .delete('/company/:id', company.deleteCompanyById)
        .get('/company/:id/store', company.getAllStoresOfCompanyById);

    //store
    app.post('/store', store.createStore)
        .get('/store', store.getAllStores)
        .get('/store/:id', store.getStoreById)
        .delete('/store/:id', store.deleteStoreById)

    //notification
    app.post('/notification', notification.createNotification)
        .get('/notification', notification.getAllNotifications)
        .get('/notification/:id', notification.getNotificationById)
        .delete('/notification/:id', notification.deleteNotificationById)

    
    //discount test
    app.post('/discount', discount.createDiscount);
}