const mongoose = require('mongoose');

const hospitalStore = mongoose.Schema({
  DrugName: { type: String, required: true },
  Batch: { type: String, required: true },
  ExpiryDate: { type: Date, required: true },
  Quentity: { type: String, required: true },
  Name: { type: String, required: true },

});

module.exports = mongoose.model('HospitalStore', hospitalStore);

