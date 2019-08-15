const express = require('express');
const router = express.Router();
const User = require("../models/user");
;
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
       //find parameters should be changed
      balance1 =reqquantity-batch1quentity;
      Drug.find({DrugName:'Panadol',Batch:'0012'}).then(document => {
        batch2quentity = +document[0]['Quentity'];
        drugid2 = document[0]['_id'];

        if(batch2quentity<balance){
        balance2 =balance-batch1quentity;
        Drug.find({DrugName:'Panadol',Batch:'0012'}).then(document => {
        batch2quentity = +document[0]['Quentity'];
        drugid2 = document[0]['_id'];

          if(batch3quentity<balance){
            res.status(201).json({
              message:"no enough storage"
            });
          }

          else{
        this.rest3 = batch3quentity-balance2;
        Drug.findOneAndUpdate({_id:drugid3},{Quentity:rest3}).then((doc)=>{
        console.log(doc);
          }

        }
      }
    }

        else{
        this.rest2 = batch2quentity-balance1;
        Drug.findOneAndUpdate({_id:drugid2},{Quentity:rest2}).then((doc)=>{
        console.log(doc);
      });

        }

      });


    }
    else{
      this.rest1 = batch1quentity-reqquantity;
      Drug.findOneAndUpdate({_id:drugid1},{Quentity:rest}).then((doc)=>{
        console.log(doc);
      });

    }
    res.status(200).json({
      message: "drug fetched successfully!",
       rest: drug
   });



});





// router.get("", (req, res, next) => {
//   Drug.find().then(documents => {
//     res.status(200).json({
//       message: "drug fetched successfully!",
//       drugs: documents
//     });
//   });
// });

module.exports = router
