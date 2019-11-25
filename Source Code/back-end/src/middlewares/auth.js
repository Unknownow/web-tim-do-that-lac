const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const PKEY = "https://stackoverflow.com/questions/52412131/secretorprivatekey-must-have-a-value/52413055";

async function auth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, PKEY);
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
