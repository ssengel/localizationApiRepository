let notificationDBO = require('../dbOperations/notificationDBO');
let badRequest = require('../helpers/badRequestError');


exports.createNotification = (notificationData) => {
    return new Promise((resolve, reject) => {
        if (!notificationData.title ||
            !notificationData.body ||
            !notificationData.location ||
            !notificationData.storeId
        ) {
            reject(badRequest('Bildirimin Bazi Bilgileri Eksik !!'));
            return;
        }



        notificationDBO.createNotification(notificationData)
            .then(notification => {
                resolve(notification);
            })
            .catch(err => {
                reject(err);
            })

    });
}

exports.getAllNotifications = () => {
    return new Promise((resolve, reject) => {


        notificationDBO.getAllNotifications()
            .then(notifications => {
                resolve(notifications);
            })
            .catch(err => {
                reject(err);
            })

    });
}

exports.getNotificationById = (notificationId) => {
    return new Promise((resolve, reject) => {


        notificationDBO.getNotificationById(notificationId)
            .then(notification => {
                resolve(notification);
            })
            .catch(err => {
                reject(err);
            })

    });
}

exports.deleteNotificationById = (notificationId) => {
    return new Promise((resolve, reject) => {


        notificationDBO.deleteNotificationById(notificationId)
            .then(notification => {
                resolve(notification);
            })
            .catch(err => {
                reject(err);
            })

    });
}