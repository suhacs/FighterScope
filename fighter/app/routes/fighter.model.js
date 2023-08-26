module.exports = (app) => {
  const fighter = require('../controllers/fighter.controller');
  let router = require('express').Router();

  router.post('/', fighter.createFighter);

  router.get('/', fighter.retreiveAll);

  router.get('/', fighter.findByFighterName);

  router.delete('/', fighter.deleteByFighterName);

  router.delete('/:id', fighter.updateById);

  app.use('/api/schedule', router);
};
