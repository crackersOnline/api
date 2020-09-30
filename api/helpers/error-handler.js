module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({
            code: 400,
            message: err,
            type: 'internal' });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ 
            code: 401,
            message: 'Invalid Token',
            type: 'internal' });
    }
// console.log('err',err);
    // default to 500 server error
    return res.status(500).json({
        code: 500,
        message: 'Something went wrong. Please contact the support team....',
        type: 'internal' });
}
