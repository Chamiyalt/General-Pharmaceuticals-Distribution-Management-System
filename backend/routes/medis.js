const express = require("express");
const Medi = require("../models/medi");

const router = express.Router();

//medicine add
router.post("", (req, res, next) => {
  const medi = new Medi({
    Drug: req.body.Drug,
    category: req.body.category,
    code: req.body.code
  });
  medi.save().then(createdMedi => {
    res.status(201).json({
      message: "medi added successfully",
      mediId: createdMedi._id
    });
  });
});


//medicine update
router.put("/:id",(req,res,next) =>{
  const medi = new Medi({
    _id: req.body.id,
    Drug: req.body.Drug,
    category: req.body.category,
    code: req.body.code
  });
  Medi.updateOne({_id: req.params.id},medi)
  .then(result => {
    res.status(200).json({message:'update successful!'});
  });
});




//medicine fetch
router.get("", (req, res, next) => {
  Medi.find().then(documents => {
    res.status(200).json({
      message: "medis fetched successfully!",
      medis: documents
    });
  });
});


router.get("/:id", (req, res, next) => {
  Medi.findById(req.params.id)
  .then(medi =>{
    if(medi){
      res.status(200).json(medi);
    }else{
      res.status(404).json({message:'medi not found'});
    }
  });
});



//medicine delete
router.delete("/:id", (req, res, next) => {
  Medi.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "medi deleted!" });
  });
});


module.exports = router;
