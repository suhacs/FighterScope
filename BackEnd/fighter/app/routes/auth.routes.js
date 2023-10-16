const verifySignUp = require('../middlewares/verifySignUp');
const controller = require('../controllers/auth.controller');
const cors = require('cors');
const express = require('express');
const app = express.Router();

module.exports = function (app) {
  app.use(
    cors({
      origin: ['http://127.0.0.1:5500'],
      optionsSuccessStatus: 200,
      credentials: true, // Corrected typo
    })
  );

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicatedNickNameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUp
  );

  app.post('/api/auth/signin', controller.signin);
  app.post('/api/auth/signout', controller.signout); // Added forward slash
};
