module.exports = (app) => {
  const fighter = require('../controllers/fighter.controller');
  let router = require('express').Router();
  const { isAdmin } = require('../middlewares/authJwt');

  router.post('/', fighter.createFighter);

  router.get('/', fighter.retrieveAllFighter);

  router.get('/:fighterName', fighter.findByFighterName);

  router.delete('/:id', fighter.deleteFighterById);

  router.put('/:id', fighter.updateById);

  app.use('/fighter', router);
};
