const mongoose = require('mongoose');

const hospitalquentities = mongoose.Schema({

  DrugName: { type: String, required: true },
  Quentity: { type: Number, required: true },
  Name: { type: String, required: true }
});


console.log(hospitalquentities);
module.exports = mongoose.model('divisionalstores', hospitalquentities);
