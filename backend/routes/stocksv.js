const express = require("express");
const hospitalquentities = require("../models/stockv");


const router = express.Router();


//router fetch
router.get("", (req, res, next) => {
  hospitalquentities.find().then(documents => {
    res.status(200).json({
      message: "Stocks fetched successfully!",
      Stocks: documents

    });
    console.log(documents);
  });

}
);

router.get("/:drug", (req, res, next) => {
  hospitalquentities.find({DrugName :req.params.drug})
  .then(hospitalquentities =>{
    if(hospitalquentities){
      res.status(200).json(hospitalquentities);
    }else{
      res.status(404).json({message:'spc not found'});
    }
  });
});


module.exports = router;



