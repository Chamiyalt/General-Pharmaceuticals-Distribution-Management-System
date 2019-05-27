const express = require("express");
const Spc = require("../models/spc");

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
    InChargeName: req.body.InChargeName,
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




//spc fetch
router.get("", (req, res, next) => {
  Spc.find().then(documents => {
    res.status(200).json({
      message: "spcs fetched successfully!",
      spcs: documents
    });
  });
});


router.get("/:id", (req, res, next) => {
  Spc.findById(req.params.id)
  .then(spc =>{
    if(spc){
      res.status(200).json(spc);
    }else{
      res.status(404).json({message:'spc not found'});
    }
  });
});



//spc delete
router.delete("/:id", (req, res, next) => {
  Spc.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "spc deleted!" });
  });
});


module.exports = router;
