const express=require('express');
const database = require('./db');
require("dotenv").config();
var cors = require('cors');


const PORT= process.env.PORT || 8081;
var app= express();


app.use(cors());

app.use(express.json());

database();

app.use('/api/', require('./routes/createUser'));
app.use('/api/', require('./routes/fetchRecord'));
app.use('/api/', require('./routes/deleteRecord'));

app.listen(port, function () {
 
    console.log("App listening at http://localhost:",PORT);
 })
 