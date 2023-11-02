const Fighter = require('../models/fighter.model');

const findFighterIDByName = async (fighterName) => {
  try {
    const regexName = new RegExp(fighterName, 'i');
    const fighters = await Fighter.find({ name: { $regex: regexName } }, '_id');
    return fighters.map((fighter) => fighter._id);
  } catch (err) {
    throw err;
  }
};

module.exports = findFighterIDByName;
