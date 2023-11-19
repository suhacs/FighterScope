const Schedule = require('../models/schedule.model');
const mongoose = require('mongoose');
const findFighterIDByName = require('../utils/fighterUtils');

const createSchedule = async (req, res) => {
  const isNotFilled =
    !req.body.date ||
    !req.body.fighter_1 ||
    !req.body.fighter_2 ||
    !req.body.place;

  try {
    const isDuplicated = await Schedule.findOne({
      date: req.body.date,
      $or: [
        { fighter_1: req.body.fighter_1, fighter_2: req.body.fighter_2 },
        { fighter_1: req.body.fighter_2, fighter_2: req.body.fighter_1 },
      ],
      place: req.body.place,
    });

    console.log(isDuplicated);

    if (isNotFilled) {
      return res.status(400).send({
        message: 'Please fill up all the input fields',
      });
    } else if (isDuplicated) {
      return res.status(400).send({
        message: 'The schedule already exists in the database.',
      });
    }

    const dateValue = new Date(req.body.date);

    // Adjust date to Toronto time
    // const localDateTime = dateValue.toLocaleString('en-US', {
    //   timeZone: 'America/New_York',
    // });

    // Create a Schedule
    const schedule = new Schedule({
      date: dateValue,
      fighter_1: new mongoose.Types.ObjectId(req.body.fighter_1),
      fighter_2: new mongoose.Types.ObjectId(req.body.fighter_2),
      place: req.body.place,
    });

    // Save Schedule in the database
    const data = await schedule.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the schedule.',
    });
  }
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

  console.log(req.body.date);
  console.log(req.body.fighter_1);
  console.log(req.body.fighter_2);
  console.log(req.body.place);

  const isNotFilled =
    !req.body.date ||
    !req.body.fighter_1 ||
    !req.body.fighter_2 ||
    !req.body.place;

  if (isNotFilled) {
    return res.status(400).send({
      message: 'Please fill up all the input fields',
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

const findByFighterName = async (fighterName) => {
  try {
    const regexName = new RegExp(fighterName, 'i');
    const data = await Fighter.find({ name: { $regex: regexName } });
    return data;
  } catch (err) {
    throw err;
  }
};

const findSchedulesByFightersNameOrPlace = async (req, res) => {
  const { param } = req.params;

  try {
    const regexParam = new RegExp(param, 'i');

    console.log('regexParam:', regexParam);

    const fighterIds = await findFighterIDByName(param); // Search for fighter IDs

    const schedules = await Schedule.find({
      $or: [
        { fighter_1: { $in: fighterIds } },
        { fighter_2: { $in: fighterIds } },
        { place: { $regex: regexParam } },
      ],
    }).populate('fighter_1 fighter_2'); // Populate fighter data

    console.log(schedules);

    if (schedules.length > 0) {
      res.send(schedules);
    } else {
      return res.status(404).send({ message: 'Fighter or place not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createSchedule,
  retreiveAllSchedule,
  deleteScheduleById,
  findSchedulesByFighterId,
  updateScheduleById,
  findSchedulesByFightersNameOrPlace,
};
