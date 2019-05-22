const express = require("express");
const Hospital = require("../models/hospital");

const router = express.Router();


//hospital add
router.hospital("", (req, res, next) => {
  const hospital = new Hospital({
    Hname: req.body.Hname,
    Dirname: req.body.Dirname,
    address: req.body.address,
    city: req.body.city,
    content: req.body.content
  });
  hospital.save().then(createdHospital => {
    res.status(201).json({
      message: "hospital added successfully",
      hospitalId: createdHospital._id
    });
  });
});


//hospital update
router.put("/:id",(req,res,next) =>{
  const hospital = new Hospital({
    _id: req.body.id,
    Hname: req.body.Hname,
    Dirname: req.body.Dirname,
    address: req.body.address,
    city: req.body.city,
    content: req.body.content
  });
  Hospital.updateOne({_id: req.params.id},hospital)
  .then(result => {
    res.status(200).json({message:'update successful!'});
  });
});



//hospital fetch
router.get("", (req, res, next) => {
  Hospital.find().then(documents => {
    res.status(200).json({
      message: "hospitals fetched successfully!",
      hospitals: documents
    });
  });
});


router.get("/:id", (req, res, next) => {
  Hospital.findById(req.params.id)
  .then(hospital =>{
    if(hospital){
      res.status(200).json(hospital);
    }else{
      res.status(404).json({message:'hospital not found'});
    }
  });
});


//hospital delete
router.delete("/:id", (req, res, next) => {
  Hospital.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "hospital deleted!" });
  });
});


module.exports = router;


