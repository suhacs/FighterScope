module.exports = (app) => {
  const schedule = require('../controllers/schedule.controller');
  let router = require('express').Router();

  router.post('/', schedule.createSchedule);

  router.get('/', schedule.retreiveAllSchedule);

  router.get('/', schedule.findByFighterByName);

  router.delete('/:id', schedule.deleteScheduleById);

  app.use('/api/schedule', router);
};
