const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
  Hname: { type: String, required: true },
  DrugName: { type: String, required: true },
  quentity: { type: Number, required: true },
  city: { type: String, required: true },
  preQty: { type: Number, required: true }
});



module.exports = mongoose.model('hospitalquentities', hospitalSchema);

