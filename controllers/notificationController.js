let notificationDBO = require('../dbOperations/notificationDBO');
let badRequest = require('../helpers/badRequestError');


exports.createNotification = (req, res, body) => {

    const mNotification = req.body;

    if (!mNotification.title ||
        !mNotification.body ||
        !mNotification.location ||
        !mNotification.storeId
    ) {
        reject(badRequest('Bildirimin Bazi Bilgileri Eksik !!'));
        return;
    }



    notificationDBO.createNotification(mNotification)
        .then(notification => {
            res.status(200).send(notification);
        })
        .catch(err => {
            next(err);
        })
}

exports.getNotifications = (req, res, next) => {

        notificationDBO.getAllNotifications()
            .then(notifications => {
                res.status(200).send(notifications);
            })
            .catch(err => {
                next(err);
            })

}

exports.getNotificationById = (req, res, next) => {

        const mNotificationId = req.params.id;

        notificationDBO.getNotificationById(mNotificationId)
            .then(notification => {
                res.status(200).send(notification);
            })
            .catch(err => {
                next(err);
            })
}

exports.deleteNotificationById = (req, res, next) => {

    const mNotificationId = req.params.id;

        notificationDBO.deleteNotificationById(mNotificationId)
            .then(notification => {
                res.status(200).send(notification);
            })
            .catch(err => {
                next(err);
            })
}