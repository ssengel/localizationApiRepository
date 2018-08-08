module.exports = (message) =>{
    let error = new Error(message);
    error.status = 400;

    return error;
}