const express = require("express");
const Hospital = require("../models/spc");

const router = express.Router();

//spc add
router.post("", (req, res, next) => {
  const spc = new Spc({
    OutletName: req.body.OutletName,
    InChargeName: req.body.InChargeName,
    Address: req.body.Address,
    RegNum: req.body.RegNum,
    Tel: req.body.Tel,
    email: req.body.email,
  });
  spc.save().then(createdSpc => {
    res.status(201).json({
      message: "spc added successfully",
      spcId: createdSpc._id
    });
  });
});

