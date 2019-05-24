const mongoose = require('mongoose');

const spcSchema = mongoose.Schema({
  OutletName: { type: String, required: true },
  InChargeName: { type: String, required: true },
  Address: { type: String, required: true },
  RegNum: { type: String, required: true },
  Tel: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Spc', spcSchema);

