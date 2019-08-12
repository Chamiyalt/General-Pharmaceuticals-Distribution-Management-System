const express = require("express");
const Drug = require("../models/drug");

const router = express.Router();


//drug add
router.post("", (req, res, next) => {
  const drug = new Drug({
    DrugName: req.body.DrugName,
    Batch: req.body.Batch,
    ExpiryDate: req.body.ExpiryDate,
    Quentity: req.body.Quentity
  });
  drug.save().then(createdDrug => {
    res.status(201).json({
      message: "Drug added successfully",
      drugId: createdDrug._id
    });
  });
});


//Drug update
router.put("/:id",(req,res,next) =>{
  const drug = new Drug({
    _id: req.body.id,
    DrugName: req.body.DrugName,
    Batch: req.body.Batch,
    ExpiryDate: req.body.ExpiryDate,
    Quentity: req.body.Quentity
      });
  Drug.updateOne({_id: req.params.id},drug)
  .then(result => {
    res.status(200).json({message:'update successful!'});
  });
});



//drug fetch
router.get("", (req, res, next) => {
  Drug.find().then(documents => {
    res.status(200).json({
      message: "drug fetched successfully!",
      drugs: documents
    });
  });
});


router.get("/:id", (req, res, next) => {
  Drug.findById(req.params.id)
  .then(drug =>{
    if(drug){
      res.status(200).json(drug);
    }else{
      res.status(404).json({message:'drug not found'});
    }
  });
});


//drug delete
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Drug.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "drug deleted!" });
  });
});


module.exports = router;



