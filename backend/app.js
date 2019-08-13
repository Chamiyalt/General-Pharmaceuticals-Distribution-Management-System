const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const medisRoutes = require("./routes/medis");
const spcsRoutes = require("./routes/spcs");
const hospitalsRoutes = require("./routes/hospitals");
const drugsRoutes = require("./routes/drugs");
const dealersRoutes = require("./routes/dealers");

//Chamin's Route
const userRoutes = require('./routes/users');

//Chamin's Route

const app = express();
// pM2VIQQ9UffJCUJl
// 134.209.146.166

mongoose.connect("mongodb+srv://chamiyalt:Chamin@123@cluster0-hw2z6.mongodb.net/node-angular?retryWrites=true",{ useNewUrlParser: true }).then(()=>{
  console.log('connected to database');
}).catch(()=> {
  console.log('connection faild');
});


//lasantha
mongoose.connect("mongodb+srv://chamiyalt:Chamin@123@cluster0-hw2z6.mongodb.net/node-angular",{ useNewUrlParser: true }).then(()=>{
  console.log('connected to database');
}).catch(()=> {
  console.log('connection faild');
});





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH,PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});



app.use("/api/hospitals", hospitalsRoutes);
app.use("/api/spcs", spcsRoutes);
app.use("/api/medis", medisRoutes);
app.use("/api/dealers", dealersRoutes);


app.use("/api/drugs", drugsRoutes);
//Chamin's Route
app.use("/api/users",userRoutes);
//Chamin's Route



module.exports = app;
