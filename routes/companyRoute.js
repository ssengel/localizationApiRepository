let CompanyController = require('../controllers/companyController');

//create company
exports.createCompany = ((req, res, next) => {

    let companyData = req.body;

    CompanyController.createCompany(companyData)
        .then(company => {
            res.send(company)
        })
        .catch(err => {
            next(err);
        })
})

exports.getAllCompanies = ((req, res, next) => {
    CompanyController.getAllCompanies()
        .then(companies => {
            res.send(companies);
        })
        .catch(err => {
            next(err);
        })
})

exports.getCompanyById = ((req, res, next) => {

    let companyId = req.params.id;

    CompanyController.getCompanyById(companyId)
        .then(company => {
            res.send(company);
        })
        .catch(err => {
            next(err);
        })
})

exports.deleteCompanyById = ((req, res, next) => {

    let companyId = req.params.id;

    CompanyController.deleteCompanyById(companyId)
        .then(company => {
            res.send(company);
        })
        .catch(err => {
            next(err);
        })
})

exports.getAllStoresOfCompanyById = ((req, res, next) => {

    let companyId = req.params.id;
    
    CompanyController.getAllStoresOfCompanyById(companyId)
        .then(stores => {
            res.send(stores);
        })
        .catch(err => {
            next(err);
        })
})

