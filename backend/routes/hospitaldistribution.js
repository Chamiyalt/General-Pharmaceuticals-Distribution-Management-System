const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Drug = require('../models/drug');
const DivisionalStore = require('../models/divisionalstore');
const DivisionalStoresData = require('../models/spc');
const HospitalStore = require('../models/hospitalstore');
const Hospital = require('../models/hospital');


router.get("",(req,res,next)=>{

  // reqquantity =+req.query.quantity;
  // hospitalname = req.query.hospital;

  reqquantity =+10;
  hospitalname = 'Horana';
  rest1=0;
  rest2=0;
  rest3=0;

  balance1=0;
  balance2=0;

  issued= 0;
  batch2quentity =0;
  batch1quentity = 0;

  drug1Exp=null;


  // drugName=req.query.drugName;

  drugName='Panadol';
  batch1 = "222";
  var division ;

  // Hospital.findOne({Hname:'Horana'}).then((doc)=>{
  //   console.log(doc.city);
  // });

  DivisionalStore.find({DrugName:drugName,Batch:"222", Name:'Colombo'}).then(document => {
    console.log(document[0]);

    batch1quentity = +document[0]['Quentity'];
    drugid1 = document[0]['_id'];
    //
    drug1Exp = document[0]['ExpiryDate'];


    if(batch1quentity<reqquantity){
      console.log('req q is higher than store 1');

      //dddddddddd
      drugName='Panadol';
      batch2 = "111";



      DivisionalStore.find({DrugName:drugName,Batch:"111",Name:'Colombo'}).then(document => {

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

          const hospitalStore = new HospitalStore({
            DrugName: drugName,
            Batch: batch1,
            ExpiryDate: drug1Exp,
            Quentity: batch1quentity,
            Name: hospitalname
          });
          hospitalStore.save()

          const hospitalStore1 = new HospitalStore({
            DrugName: drugName,
            Batch: batch2,
            ExpiryDate: drug1Exp,
            Quentity: balance2,
            Name: name
          });
          hospitalStore1.save()

          hospitalStore1.deleteOne({ _id: drugid1,Name: division }).then((deleted)=>{
            console.log(rest2);
          });
          DivisionalStore.findOneAndUpdate({_id:drugid2,Name: division },{ "$set": { Quentity:rest2, Batch:batch1}}).then((doc)=>{
            console.log('updated');
          })


          //Drug.findOneAndUpdate({_id:drugid2},{Batch:batch1});



        }



      });

      //dddddddddd



    }

    else{
      rest1 = batch1quentity-reqquantity;
      DivisionalStore.findOneAndUpdate({_id:drugid1,Name:division},{Quentity:rest1}).then((doc)=>{

        const hospitalStore = new HospitalStore({
          DrugName: doc.DrugName,
          Batch: doc.Batch,
          ExpiryDate: doc.ExpiryDate,
          Quentity: reqquantity,
          Name: hospitalname
        });
        hospitalStore.save()
      });

    }
    res.status(200).json({
      message: "drug fetched successfully!",
       rest: rest1
   });

  });
});

module.exports = router
