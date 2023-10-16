const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  date: Date,
  fighter_1: { type: mongoose.Schema.Types.ObjectId, ref: 'fighter' },
  fighter_2: { type: mongoose.Schema.Types.ObjectId, ref: 'fighter' },
  place: String,
});

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Schedule = mongoose.model('schedule', schema);
module.exports = Schedule;
