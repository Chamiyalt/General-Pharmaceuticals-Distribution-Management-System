const express = require("express");
const Dealer = require("../models/dealer");

const router = express.Router();

// add
router.post("", (req, res, next) => {
  const dealer = new Dealer({
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel
  });
  dealer.save().then(createdDealer => {
    res.status(201).json({
      message: "dealer added successfully",
      dealerId: createdDealer._id
    });
  });
});


// update
router.put("/:id",(req,res,next) =>{
  const dealer = new Dealer({
    _id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel
  });
  Dealer.updateOne({_id: req.params.id},dealer)
  .then(result => {
    res.status(200).json({message:'update successful!'});
  });
});




//medicine fetch
router.get("", (req, res, next) => {
  Dealer.find().then(documents => {
    res.status(200).json({
      message: "dealers fetched successfully!",
      dealers: documents
    });
  });
});


router.get("/:id", (req, res, next) => {
  Dealer.findById(req.params.id)
  .then(dealer =>{
    if(dealer){
      res.status(200).json(dealer);
    }else{
      res.status(404).json({message:'dealer not found'});
    }
  });
});



//delete
router.delete("/:id", (req, res, next) => {
  Dealer.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "dealer deleted!" });
  });
});


module.exports = router;
