const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicatedNickNameOrEmail = async (req, res, next) => {
  try {
    const existingNickNameUser = await User.findOne({
      nickName: req.body.nickName,
    }).exec();

    if (existingNickNameUser) {
      return res
        .status(400)
        .send({ message: 'Failed! the nickname is already in use' });
    }

    const existingEmailUser = await User.findOne({
      email: req.body.email,
    }).exec();

    if (existingEmailUser) {
      return res
        .status(400)
        .send({ message: 'Failed the email is already in use' });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = o; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist`,
        });
        return;
      }
    }
  }
  next();
};

const verifySignup = {
  checkDuplicatedNickNameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignup;
