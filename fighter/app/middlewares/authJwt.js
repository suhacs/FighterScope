const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const user = db.User;
const role = db.Role;
