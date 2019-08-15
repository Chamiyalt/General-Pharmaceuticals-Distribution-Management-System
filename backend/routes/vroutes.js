const express = require("express");
const Hospitals = require("../models/hospitaQueantityv");


const router = express.Router();





//medicine fetch
router.get("", (req, res, next) => {
  Hospitals.find().then(documents => {
    res.status(200).json({
      message: "hospitalquentities fetched successfully!",
      hospitalquentities: documents

    });
    console.log(documents);
  });

}
);


module.exports = router;



