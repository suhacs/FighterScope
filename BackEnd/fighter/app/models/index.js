require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.ROLES = ['user', 'admin'];
db.url = process.env.url;

db.fighter = require('./fighter.model')(mongoose);
db.schedule = require('./schedule.model')(mongoose);

module.exports = db;
