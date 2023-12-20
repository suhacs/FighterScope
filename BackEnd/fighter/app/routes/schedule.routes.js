module.exports = (app) => {
  const schedule = require('../controllers/schedule.controller');
  let router = require('express').Router();
  const { isAdmin } = require('../middlewares/authJwt');

  router.post('/', schedule.createSchedule);

  router.get('/', schedule.retrieveFutureSchedule);

  router.get('/fighter/:fighterId', schedule.findSchedulesByFighterId);

  router.get('/:param', schedule.findSchedulesByFightersNameOrPlace);

  router.delete('/:id', schedule.deleteScheduleById);

  router.put('/:id', schedule.updateScheduleById);

  app.use('/schedule', router);
};
