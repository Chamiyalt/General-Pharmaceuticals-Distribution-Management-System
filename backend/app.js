const express = require('express');

const app = express();

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT OPTIONS"
  );
  next();
})



app.use("/api/posts",(req ,res, next)=> {
 const posts = [{
   id:'sdadass' , title:'first server sidee post', content:'this is comming from server'
 },
 {
  id:'sdadass1' , title:'second server side post', content:'this is comming from server'
}
];

res.status(200).json({
  message: 'Post fetch succesfully',
  posts:posts
})

});

module.exports = app ;
