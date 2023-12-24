const express=require('express');
const database = require('./db');
require("dotenv").config();
const port= 8081;
var app= express();



app.use(express.json());

database();

app.use('/api/', require('./routes/createUser'));
app.use('/api/', require('./routes/fetchRecord'));
app.use('/api/', require('./routes/deleteRecord'));

app.listen(port, function () {
 
    console.log("App listening at http://localhost:",port);
 })
 