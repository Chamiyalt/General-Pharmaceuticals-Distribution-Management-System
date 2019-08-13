const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
  DrugName: { type: String, required: true },
  Batch: { type: String, required: true },
  ExpiryDate: { type: Date, required: true },
  Quentity: { type: String, required: true },

});

module.exports = mongoose.model('Drug', drugSchema);

