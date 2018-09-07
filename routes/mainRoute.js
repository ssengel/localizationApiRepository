let auth = require('../controllers/authController');
let company = require('../controllers/companyController');
let discount = require('../controllers/discountController');
let store = require('../controllers/storeController');
let notification = require('../controllers/notificationController');
let user = require('../controllers/userController');


exports.mainRoute = (app) => {

    //auth
    app.post('/login', auth.login)
        .post('/register', auth.register)

    //user
    app.get('/user', user.getUsers)
        .get('/user/:id', user.getUserById)
        .put('/user/:id/uploadImage', user.uploadImage)

    //company
    app.post('/company', company.createCompany)
        .get('/company', company.getAllCompanies)
        .get('/company/:id', company.getCompanyById)
        .delete('/company/:id', company.deleteCompanyById)
        .get('/company/:id/store', company.getAllStoresOfCompanyById)

    //store
    app.post('/store', store.createStore)
        .get('/store', store.getStores)
        .get('/store/:id', store.getStoreById)
        .delete('/store/:id', store.deleteStoreById)


    //notification
    app.post('/notification', notification.createNotification)
        .get('/notification', notification.getNotifications)
        .get('/notification/:id', notification.getNotificationById)
        .delete('/notification/:id', notification.deleteNotificationById)

    //discount test
    app.post('/discount', discount.createDiscount);
}