
const express = require("express");
const HospitalQuentity = require("../models/hospitalQuentity");

const router = express.Router();


//hospital Quentity add
router.post("", (req, res, next) => {
  const hospitalQuentity = new HospitalQuentity({
    Hname: req.body.Hname,
    DrugName: req.body.DrugName,
    quentity: req.body.quentity,

  });
  hospitalQuentity.save().then(createdHospitalQuentity => {
    res.status(201).json({
      message: "hospital Quentity added successfully",
      hospitalQuentityId: createdHospitalQuentity._id
    });
  });
});


//hospital Quentity update
router.put("/:id",(req,res,next) =>{
  const hospitalQuentity = new HospitalQuentity({
    _id: req.body.id,
    Hname: req.body.Hname,
    DrugName: req.body.DrugName,
    quentity: req.body.quentity,

  });
  HospitalQuentity.updateOne({_id: req.params.id},hospitalQuentity)
  .then(result => {
    res.status(200).json({message:'update successful!'});
  });
});



//hospital Quentity fetch
router.get("", (req, res, next) => {
  HospitalQuentity.find().then(documents => {
    res.status(200).json({
      message: "hospitals Quentity fetched successfully!",
      hospitalsQuentity: documents
    });
  });
});


router.get("/:id", (req, res, next) => {
  HospitalQuentity.findById(req.params.id)
  .then(hospitalQuentity =>{
    if(hospitalQuentity){
      res.status(200).json(hospitalQuentity);
    }else{
      res.status(404).json({message:'hospital Quentity not found'});
    }
  });
});


//hospital Quentity delete
router.delete("/:id", (req, res, next) => {
  HospitalQuentity.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "hospital Quentity deleted!" });
  });
});


module.exports = router;



