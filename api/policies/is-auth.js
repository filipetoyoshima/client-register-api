var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    if (req.headers && req.headers.authorization) {
        console.log(req.headers);
        let parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            let scheme = parts[0];
            console.log(scheme);
            console.log(/^Bearer$/i.test(scheme));
            let credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                jwt.verify(credentials, 'secret', function (err, decoded) {
                    if (err) {
                        return res.status(401).json(err);
                    }
                    req.user = decoded;
                    next();
                });
            } else {
                return res.status(401)
                    .json({
                        err: 'The correct format is "Authorization: Bearer [token]"'
                    });
            }

        }
    } else {
        return res.status(401)
            .json({
                err: 'Authorization header not found'
            });
    }
}