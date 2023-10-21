const Schedule = require('../models/schedule.model');
const mongoose = require('mongoose');

const createSchedule = (req, res) => {
  const isNotFilled =
    !req.body.date ||
    !req.body.fighter_1 ||
    !req.body.fighter_2 ||
    !req.body.place;

  const isDuplicated =
    Schedule.find(req.body.date) &&
    Schedule.find(req.body.fighter_1) &&
    Schedule.find(req.body.fighter_2) &&
    Schedule.find(req.body.place);

  // Validate request
  if (isNotFilled) {
    return res.status(400).send({
      message: 'Date, fighter_1, fighter_2, and place are required fields!',
    });
  } else if (isDuplicated) {
    return res.status(400).send({
      message: 'The schedule already exist in the database!',
    });
  }

  const dateValue = new Date(req.body.date);

  // Adjust date to Toronto time
  const localDateTime = dateValue.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  // Create a Schedule
  const schedule = new Schedule({
    date: localDateTime,
    fighter_1: new mongoose.Types.ObjectId(req.body.fighter_1), // Convert to ObjectId
    fighter_2: new mongoose.Types.ObjectId(req.body.fighter_2), // Convert to ObjectId
    place: req.body.place,
  });

  // Save Schedule in the database
  schedule
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the schedule.',
      });
    });
};

const retreiveAllSchedule = (req, res) => {
  Schedule.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send;
    });
};

const deleteScheduleById = (req, res) => {
  const id = req.params.id;

  Schedule.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot delete schedule with id=${id}',
        });
      } else {
        res.send({
          message: 'Schedule was deleted successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete schedule with id=' + id,
      });
    });
};

const findSchedulesByFighterId = async (req, res) => {
  const fighterId = req.params.fighterId;
  try {
    const schedules = await Schedule.find({
      $or: [{ fighter_1: fighterId }, { fighter_2: fighterId }],
    });
    return schedules;
  } catch (err) {
    return res.status(404).send({ messsage: 'Fighter not found' });
  }
};

const updateScheduleById = (req, res) => {
  const id = req.params.id;

  const isNotFilled =
    !req.body.date ||
    !req.body.fighter_1 ||
    !req.body.fighter_2 ||
    !req.body.place;

  // Validate request
  if (isNotFilled) {
    return res.status(400).send({
      message: 'Date, fighter_1, fighter_2, and place are required fields!',
    });
  }

  const dateValue = new Date(req.body.date);

  const localDateTime = dateValue.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  });

  const updatedSchedule = {
    date: localDateTime,
    fighter_1: new mongoose.Types.ObjectId(req.body.fighter_1),
    fighter_2: new mongoose.Types.ObjectId(req.body.fighter_2),
    place: req.body.place,
  };

  console.log(updatedSchedule);

  Schedule.findByIdAndUpdate(id, { $set: updatedSchedule }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update schedule with id=${id}. Schedule not found.`,
        });
      }
      res.send({ message: 'Schedule was updated successfully', data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'Error updating schedule with id=' + id,
      });
    });
};

module.exports = {
  createSchedule,
  retreiveAllSchedule,
  deleteScheduleById,
  findSchedulesByFighterId,
  updateScheduleById,
};
