const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require("../config");

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, config.jwtKey);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) {
            throw new Error('Unabled authenticate');
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = auth;