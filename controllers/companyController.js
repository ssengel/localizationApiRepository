let CompanyDBO = require('../dbOperations/companyDBO');
let badRequest = require('../helpers/badRequestError');
let mongoose = require('mongoose');

exports.createCompany = (companyData) => {
    return new Promise((resolve, reject) => {

        if (
            !companyData.name ||
            !companyData.email ||
            !companyData.phone ||
            !companyData.address
        ) {
            reject(badRequest('Firmanin Bazi Bilgileri Eksik !!'));
            return;
        }// type kontrolude yapilmali number string vs.


        CompanyDBO.createCompany(companyData)
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}


exports.getCompanyById = (companyId) => {
    return new Promise((resolve, reject) => {

        
        if(!mongoose.Types.ObjectId.isValid(companyId)){
            reject(badRequest('Gecersiz ID formati !!'));
            return;
        }

        CompanyDBO.getCompanyById(companyId)
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}


exports.deleteCompanyById = (companyId) => {
    return new Promise((resolve, reject) => {


        if(!mongoose.Types.ObjectId.isValid(companyId)){
            reject(badRequest('Gecersiz ID formati !!'));
            return;
        }

        CompanyDBO.deleteCompanyById(companyId)
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}


exports.getAllCompanies = () => {
    return new Promise((resolve, reject) => {

        //kontroller

        CompanyDBO.getAllCompanies()
            .then(companies => {
                resolve(companies);
            })
            .catch(err => {
                reject(err);
            })
    })
}


exports.getAllStoresOfCompanyById = (companyId) => {
    return new Promise((resolve, reject) => {

        if(!mongoose.Types.ObjectId.isValid(companyId)){
            reject(badRequest('Gecersiz ID formati !!'));
            return;
        }

        CompanyDBO.getAllStoresOfCompanyById(companyId)
            .then(stores => {
                resolve(stores);
            })
            .catch(err => {
                reject(err);
            })
    })
}



