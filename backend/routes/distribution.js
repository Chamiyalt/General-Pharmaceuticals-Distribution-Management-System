const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Drug = require('../models/drug');


router.get("",(req,res,next)=>{

  reqquantity =+10;
  rest1=0;
  rest2=0;
  rest3=0;

  balance1=0;
  balance2=0;

  issued= 0;
  batch2quentity =0;


  Drug.find({DrugName:'Panadol',Batch:'0012'}).then(document => {
    batch1quentity = +document[0]['Quentity'];
    drugid1 = document[0]['_id'];

    if(batch1quentity<reqquantity){

    }

    else{
      this.rest1 = batch1quentity-reqquantity;
      Drug.findOneAndUpdate({_id:drugid1},{Quentity:rest1}).then((doc)=>{
        console.log(doc);
      });

    }
    res.status(200).json({
      message: "drug fetched successfully!",
       rest: this.rest1
   });

  });
});

module.exports = router
