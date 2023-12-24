const mongoose= require('mongoose');
const newrul="mongodb+srv://gautamjha509:gautam30@cluster0.inci5y2.mongodb.net/ThaiID?retryWrites=true&w=majority";
// const newrul="mongodb+srv://gautamjha25:gautam30@cluster0.rah5lsm.mongodb.net/HostelManagement?retryWrites=true&w=majority";
// const mongoURI="mongodb://localhost:27017/ocrapp";
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