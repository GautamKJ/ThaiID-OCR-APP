const express=require('express');
const port= process.env.PORT || 8081;
const app= express();


app.use(express.json());


app.listen(port, function () {
 
    console.log("Example app listening at http://localhost:",port);
 })
 