let Notification = require('../models/Notification');

exports.createNotification = (notificationData) => {

    let mNotification = new Notification(notificationData);

    return new Promise((resolve, reject) => {
        mNotification.save()
            .then(notification => {
                resolve(notification);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getAllNotifications = () => {
    return new Promise((resolve, reject) => {
        Notification.find({})
            .then(notifications => {
                resolve(notifications);
            })
            .catch(err => {
                reject(err);
            })

    })
}

exports.getNotificationById = (notificationId) => {
    return new Promise((resolve, reject) => {
        Notification.findOne({_id: notificationId})
            .then(notification => {
                resolve(notification);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteNotificationById = (notificationId) => {
    return new Promise((resolve, reject) => {
        Notification.deleteOne({_id: notificationId})
            .then(notification => {
                resolve(notification);
            })
            .catch(err => {
                reject(err);
            })
    })
}