const express=require('express');
const database = require('./db');
require("dotenv").config();
const port= 8081;
var app= express();



app.use(express.json());
// app.use(express.static(path.join(__dirname, 'my-app', 'build')));
database();

app.use('/api/', require('./routes/createUser'));
app.use('/api/', require('./routes/fetchRecord'));
app.use('/api/', require('./routes/deleteRecord'));

app.listen(port, function () {
 
    console.log("Example app listening at http://localhost:",port);
 })
 