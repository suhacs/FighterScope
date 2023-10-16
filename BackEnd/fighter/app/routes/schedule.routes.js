module.exports = (app) => {
  const schedule = require('../controllers/schedule.controller');
  let router = require('express').Router();

  router.post('/', schedule.createSchedule);

  router.get('/', schedule.retreiveAllSchedule);

  router.get('/fighter/:fighterId', schedule.findSchedulesByFighterId);

  router.delete('/:id', schedule.deleteScheduleById);

  app.use('/schedule', router);
};
