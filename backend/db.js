const mongoose= require('mongoose');
const newrul="mongodb+srv://gautamjha509:gautam30@cluster0.inci5y2.mongodb.net/ThaiID?retryWrites=true&w=majority";

const database= ()=>{
     mongoose.connect(newrul).then(
        ()=>{
        console.log("Database connected........");
    })
    .catch((err) =>{
        console.log("no connection");
    })

    

}

module.exports=database;