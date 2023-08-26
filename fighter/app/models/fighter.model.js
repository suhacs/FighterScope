const mongoose = require('mongoose');

let schema = mongoose.Schema({
  name: String,
  nationality: String,
});

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Fighter = mongoose.model('fighter', schema);

module.exports = Fighter;
