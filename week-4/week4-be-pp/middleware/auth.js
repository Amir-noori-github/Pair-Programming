function auth(req, res, next) {
    if (req.query.admin === 'true') {
        req.admin = true;
        next();
    }
    res.status(401).send('No auth');
}


module.exports = auth;
