const mongoose = require('mongoose');

const mediSchema = mongoose.Schema({
  DrugName: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true },

});

module.exports = mongoose.model('Medi', mediSchema);

