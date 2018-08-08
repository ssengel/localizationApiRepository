let NotifController = require('../controllers/notificationController');

//create a notification
exports.createNotification = ((req, res, next) => {

    let notificationData = req.body;

    NotifController.createNotification(notificationData)
        .then(notification => {
            res.send(notification);
        })
        .catch(err => {
            next(err);
        })
})

//get all notifications
exports.getAllNotifications = ((req, res, next) => {

    NotifController.getAllNotifications()
        .then(notifications => {
            res.send(notifications);
        })
        .catch(err => {
            next(err);
        })
})

//get a notification
exports.getNotificationById = ((req, res, next) => {

    let notificationId = req.params.id;

    NotifController.getNotificationById(notificationId)
        .then(notification => {
            res.send(notification);
        })
        .catch(err => {
            next(err);
        })
})

//delete a notification
exports.deleteNotificationById = ((req, res, next) => {

    let notificationId = req.params.id;

    NotifController.deleteNotificationById(notificationId)
        .then(notification => {
            res.send(notification);
        })
        .catch(err => {
            next(err);
        })
})