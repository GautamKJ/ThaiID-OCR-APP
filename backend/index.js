const express=require('express');
const database = require('./db');
require("dotenv").config();
const path=require('path');
var cors = require('cors');


const PORT= process.env.PORT || 8081;
var app= express();


app.use(cors());



app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Server is working");
})
database();

app.use('/api/', require('./routes/createUser'));
app.use('/api/', require('./routes/fetchRecord'));
app.use('/api/', require('./routes/deleteRecord'));

app.use(express.static(path.join(__dirname,  'build')));
console.log(path.join(__dirname, '../frontend/ocr-app', 'build'));
console.log("asfasdf");


// app.get('*', (req, res) => {

//     const _path =path.resolve(__dirname,  'build', 'index.html');
//     console.log("afd ",_path);
//     res.sendFile(_path);
// })

app.listen(PORT, function () {
 
    console.log("App listening at http://localhost:",PORT);
 })
 