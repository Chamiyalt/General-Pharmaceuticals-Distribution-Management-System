const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
  Hname: { type: String, required: true },
  Dirname: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Hospital', hospitalSchema);

