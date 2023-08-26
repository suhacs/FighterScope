const db = require('../models/fighter.model');
const Fighter = db.Fighter;

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
const retreiveAll = async (req, res) => {
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
    const name = req.params.name;
    const data = await Fighter.find({ name });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Error occurred finding fighter named ' + name,
    });
  }
};

// Delete Fighter by Name
const deleteByFighterName = async (req, res) => {
  try {
    const name = req.params.name;
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
  retreiveAll,
  findByFighterName,
  deleteByFighterName,
  updateById,
};
