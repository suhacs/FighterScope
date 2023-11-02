// const db = require('../models');
// const Fighter = db.fighter;

const Fighter = require('../models/fighter.model');
// const db = require('../models');
// const Fighter = db.fighter;

// Create and Save a new Fighter
const createFighter = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Contents can not be empty' });
    }

    const fighter = new Fighter({
      name: req.body.name,
      nationality: req.body.nationality,
    });

    const data = await fighter.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while creating fighter',
    });
  }
};

// Retrieve all Fighters
const retrieveAllFighter = async (req, res) => {
  try {
    const data = await Fighter.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while retrieving fighters',
    });
  }
};

// Find Fighters by Name
const findByFighterName = async (req, res) => {
  try {
    const fighterName = req.params.fighterName;
    const regexName = new RegExp(fighterName, 'i');
    const data = await Fighter.find({ name: { $regex: regexName } });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Error occurred finding fighter named ' + req.params.fighterName,
    });
  }
};

// Delete Fighter by Name
const deleteByFighterName = async (req, res) => {
  try {
    const name = req.params.fighterName; // Correct the parameter name here
    const data = await Fighter.deleteOne({ name });

    if (data.deletedCount === 0) {
      return res.status(404).send({
        message: `Fighter with name ${name} was not found.`,
      });
    }

    res.send({
      message: `Fighter with name ${name} was deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Could not delete Fighter with name ' + name,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.name) {
      return res.status(400).send({ message: 'Name cannot be empty' });
    }

    const updatedFighter = await Fighter.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        nationality: req.body.nationality,
      },
      { new: true }
    );

    if (!updatedFighter) {
      return res.status(404).send({
        message: `Fighter with ID ${id} was not found.`,
      });
    }

    res.send(updatedFighter);
  } catch (err) {
    res.status(500).send({
      message: 'Error occurred while updating fighter: ' + err.message,
    });
  }
};

module.exports = {
  createFighter,
  retrieveAllFighter,
  findByFighterName,
  deleteByFighterName,
  updateById,
};
