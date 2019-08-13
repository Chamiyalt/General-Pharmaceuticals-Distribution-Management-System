
const mongoose = require('mongoose');

const hospitalQuentitySchema = mongoose.Schema({
  Hname: { type: String, required: true },
  DrugName: { type: String, required: true },
  quentity: { type: String, required: true },

});

module.exports = mongoose.model('HospitalQuentity', hospitalQuentitySchema);

