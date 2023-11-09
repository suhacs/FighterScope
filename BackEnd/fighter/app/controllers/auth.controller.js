require('dotenv').config();
const db = require('../models');
const User = db.user;
const Role = db.role;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
  try {
    const user = await createUser(req.body);
    await assignRoles(user, req.body.role);
    await user.save();

    res.send({ message: 'User was registered successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createUser = async (userData) => {
  const hashedpw = await bcrypt.hash(userData.password, 8);

  return new User({
    name: userData.name,
    nickName: userData.nickName,
    email: userData.email,
    password: hashedpw,
  });
};

const assignRoles = async (user, role) => {
  if (role) {
    const roleInDb = await Role.find({ name: { $in: role } });
    user.role = roleInDb.map((role) => role._id);
  } else {
    const defaultRole = await Role.findOne({ name: 'user' });
    user.role = defaultRole._id;
  }
};

const signin = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).send({ messsage: 'Email not found' });
    }
    const isValidPassword = bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const authorities = await getUserAuthority(user);
    const isAdmin = authorities === 'admin';
    const token = generateAuthToken(user, isAdmin);

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: authorities,
      token: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).populate('role', '-__v').exec();
    return user;
  } catch (err) {
    throw err;
  }
};

const generateAuthToken = (user, isAdmin) => {
  return jwt.sign({ email: user.email, isAdmin }, process.env.secret, {
    expiresIn: 86400,
  });
};

const getUserAuthority = async (user) => {
  const role = await Role.findById(user.role);
  return role.name;
};

const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

module.exports = {
  signUp,
  createUser,
  assignRoles,
  signin,
  findUserByEmail,
  generateAuthToken,
  getUserAuthority,
  signout,
};
