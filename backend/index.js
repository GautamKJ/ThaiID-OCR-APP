const express=require('express');
const database = require('./db');
require("dotenv").config();
const port= process.env.PORT || 8081;
const app= express();



app.use(express.json());
database();

app.listen(port, function () {
 
    console.log("Example app listening at http://localhost:",port);
 })
 