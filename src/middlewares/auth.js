const jwt = require('jsonwebtoken');
const { auth } = require('../config');

const authentication = async (req, res, next) => {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(' ')[1];
        try {
            let verify = await jwt.verify(token, auth.secret);
            req.token = verify;

            return next();
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({ error: 'Token inválido. Faça login para acessar.' });
        }
    }
    return res
        .status(400)
        .json({ error: 'Token inválido. Faça login para acessar.' });
};

module.exports = authentication;
