const jwt = require('jsonwebtoken');
const config = require('../config');

const sign = (data) => {
    return jwt.sign(data, config.jwtSecret);
};

const check ={
    own: function(req, owner){
        const decoded = decodeHeader(req);
        if(decoded.id !== owner){
            throw new Error('You can not do this');
        }
    },
}

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
};

const getToken = (authorization) => {
    if(!authorization){
        throw new Error('There is not token');
    }
    if(authorization.indexOf('Bearer ') === -1){
        throw new Error('Invalid format');
    }
    let token = authorization.replace('Bearer ', '');
    return token;
};

const verify = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

module.exports = {
    sign,
    check,
};