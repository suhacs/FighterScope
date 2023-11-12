const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: 'No valid token' });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userMail = decoded.email;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.userMail }).exec();

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    if (roles.some((role) => role.name === 'admin')) {
      next();
    } else {
      res.status(403).send({ message: 'Require Admin Role!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Internal Server Error' });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
