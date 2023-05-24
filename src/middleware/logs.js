const logRequest = (req, res, next) => {
    console.log('Terjadi Logs reques ke Path : ' , req.path );
    next();
}

module.exports = logRequest;