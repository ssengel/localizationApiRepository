let Company = require('../models/Company');
let Store = require('../models/Store');

//bu seviyedeki hatalar onceden tanimli ve Sunucuyu ilgilendiren hatalar.

//create a new company
exports.createCompany = (companyData) => {

    let company = new Company(companyData);

    return new Promise((resolve, reject) => {
        company.save()
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//get all Companies
exports.getAllCompanies = () => {
    return new Promise((resolve, reject) => {
        Company.find({})
            .then(companies => {
                resolve(companies);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//get a company
exports.getCompanyById = (companyId) => {
    return new Promise((resolve, reject) => {
        Company.findOne({ _id: companyId })
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//delete a company
exports.deleteCompanyById = (companyId) => {
    return new Promise((resolve, reject) => {
        Company.deleteOne({ _id: companyId })
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}


//all stores of a company
exports.getAllStoresOfCompanyById = (companyId) => {
    return new Promise((resolve, reject) => {
        Store.find({ companyId: companyId })
            .then(company => {
                resolve(company);
            })
            .catch(err => {
                reject(err);
            })
    })
}