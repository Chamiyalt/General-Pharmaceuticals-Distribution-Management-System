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


//spc update
router.put("/:id",(req,res,next) =>{
  const spc = new Spc({
    _id: req.body.id,
    OutletName: req.body.OutletName,
    OutletName: req.body.InChargeName,
    Address: req.body.Address,
    RegNum: req.body.RegNum,
    Tel: req.body.Tel,
    email: req.body.email
  });
  Spc.updateOne({_id: req.params.id},spc)
  .then(result => {
    res.status(200).json({message:'update successful!'});
  });
});
