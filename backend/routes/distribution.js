const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Drug = require('../models/drug');
const DivisionalStore = require('../models/divisionalstore');
const DivisionalStoresData = require('../models/spc');


router.get("",(req,res,next)=>{

  reqquantity =+req.query.quantity;
  name = req.query.divisionalStore;
  rest1=0;
  rest2=0;
  rest3=0;

  balance1=0;
  balance2=0;

  issued= 0;
  batch2quentity =0;
  batch1quentity = 0;

  drug1Exp=null;


  drugName=req.query.drugName;
  batch1 = "222";

  Drug.find({DrugName:drugName,Batch:"222"}).then(document => {

    batch1quentity = +document[0]['Quentity'];
    drugid1 = document[0]['_id'];
    //
    drug1Exp = document[0]['ExpiryDate'];


    if(batch1quentity<reqquantity){
      console.log('req q is higher than store 1');

      //dddddddddd
      drugName='Panadol';
      batch2 = "111";



      Drug.find({DrugName:drugName,Batch:"111"}).then(document => {

        batch2quentity = +document[0]['Quentity'];
        drugid2 = document[0]['_id'];

        console.log(batch2quentity);
        console.log(drugid2);



        balance2 = reqquantity - batch1quentity;

        if(balance2>batch2quentity){
          res.status(200).json({
            message: "cannot transfer the quantity"
          });
        }
        else{
          rest2 = batch2quentity - balance2;

          const divisionalStore = new DivisionalStore({
            DrugName: drugName,
            Batch: batch1,
            ExpiryDate: drug1Exp,
            Quentity: batch1quentity,
            Name: name
          });
          divisionalStore.save()

          Drug.deleteOne({ _id: drugid1 })

          const divisionalStore1 = new DivisionalStore({
            DrugName: drugName,
            Batch: batch2,
            ExpiryDate: drug1Exp,
            Quentity: balance2,
            Name: name
          });
          divisionalStore1.save()

          Drug.deleteOne({ _id: drugid1 }).then((deleted)=>{
            console.log(rest2);
          });
          Drug.findOneAndUpdate({_id:drugid2},{ "$set": { Quentity:rest2, Batch:batch1}}).then((doc)=>{
            console.log('updated');
          })


          //Drug.findOneAndUpdate({_id:drugid2},{Batch:batch1});



        }



      });

      //dddddddddd



    }

    else{
      rest1 = batch1quentity-reqquantity;
      Drug.findOneAndUpdate({_id:drugid1},{Quentity:rest1}).then((doc)=>{

        const divisionalStore = new DivisionalStore({
          DrugName: doc.DrugName,
          Batch: doc.Batch,
          ExpiryDate: doc.ExpiryDate,
          Quentity: reqquantity,
          Name: name
        });
        divisionalStore.save()
      });

    }
    res.status(200).json({
      message: "drug fetched successfully!",
       rest: rest1
   });

  });
});

module.exports = router
