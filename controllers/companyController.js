let CompanyDBO = require('../dbOperations/companyDBO');
let badRequest = require('../helpers/badRequestError');
let mongoose = require('mongoose');
let Company = require('../models/Company');

exports.createCompany = (req, res, next) => {

    const mCompany = new Company(req.body)

    if (
        !mCompany.name ||
        !mCompany.email ||
        !mCompany.phone ||
        !mCompany.address
    ) {
        reject(badRequest('Firmanin Bazi Bilgileri Eksik !!'));
        return;
    }// type kontrolude yapilmali number string vs.


    CompanyDBO.createCompany(mCompany)
        .then(company => {
            res.status(200).send(company);
        })
        .catch(err => {
            next(err);
        })

}


exports.getCompanyById = (req, res, next) => {

    const mCompanyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mCompanyId)) {
        reject(badRequest('Gecersiz ID formati !!'));
        return;
    }

    CompanyDBO.getCompanyById(mCompanyId)
        .then(company => {
            res.status(200).send(company);
        })
        .catch(err => {
            next(err);
        })
}


exports.deleteCompanyById = (req, res, next) => {

    const mCompanyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mCompanyId)) {
        reject(badRequest('Gecersiz ID formati !!'));
        return;
    }

    CompanyDBO.deleteCompanyById(mCompanyId)
        .then(company => {
            res.status(200).send(company)
        })
        .catch(err => {
            next(err);
        })
}

exports.getAllCompanies = (req, res, next) => {

    const mCompanyId = req.params.id;

    CompanyDBO.getAllCompanies()
        .then(companies => {
            res.status(200).send(companies);
        })
        .catch(err => {
            next(err);
        })
}


exports.getAllStoresOfCompanyById = (req, res, next) => {

    const mCompanyId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(mCompanyId)) {
        reject(badRequest('Gecersiz ID formati !!'));
        return;
    }

    
    CompanyDBO.getAllStoresOfCompanyById(mCompanyId)
        .then(stores => {
            resolve(stores);
        })
        .catch(err => {
            reject(err);
        })
}



