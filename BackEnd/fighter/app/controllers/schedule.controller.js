const Schedule = require('../models/schedule.model');
const mongoose = require('mongoose');

const createSchedule = (req, res) => {
  // Validate request
  if (
    !req.body.date ||
    !req.body.fighter_1 ||
    !req.body.fighter_2 ||
    !req.body.place
  ) {
    return res.status(400).send({
      message: 'Date, fighter_1, fighter_2, and place are required fields!',
    });
  }

  // Create a Schedule
  const schedule = new Schedule({
    date: req.body.date,
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

// const findByFighterByName = (req, res) => {
//   const fighterName = req.params.name;

//   Schedule.find({
//     $or: [{ fighter_1: fighterName }, { fighter_2: fighterName }],
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error finding schedules by fighter names: ' + err.message,
//       });
//     });
// };

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

module.exports = {
  createSchedule,
  retreiveAllSchedule,
  deleteScheduleById,
  findSchedulesByFighterId,
};
