module.exports = (app) => {
  const fighter = require('../controllers/fighter.controller');
  let router = require('express').Router();
  // Create a new fighter
  router.post('/', fighter.createFighter);

  // Retrieve all fighters
  router.get('/', fighter.retrieveAllFighter);

  // Retrieve a fighter by name
  router.get('/:fighterName', fighter.findByFighterName);

  // Delete a fighter by name
  router.delete('/:fighterName', fighter.deleteByFighterName);

  // Update a fighter by ID
  router.put('/:id', fighter.updateById);

  app.use('/fighter', router); // Updated endpoint to be more specific
};
