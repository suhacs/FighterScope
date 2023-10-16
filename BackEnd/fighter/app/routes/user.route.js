const cors = require('cors');
const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(cors());

  app.get('/api/all', controller.publicBoard);

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get(
    'api/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
