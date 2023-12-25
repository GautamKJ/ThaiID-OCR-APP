const express= require("express");
const User=require('../Schema/user_details');
const router = express.Router();

const { decryptData } = require('./Module/ocrservices'); 




router.get('/fetchrecord', async (req,res)=>{
   
    try {
        const records = await User.find();
        console.log("user ",records);
        for (let record = 0; record < records.length; record++) {
            console.log("gautam ", records[record].first_name);
            
            // Decrypt the data 
            records[record].first_name=decryptData(records[record].first_name);
            
                  
            records[record].lastName=decryptData(records[record].lastName);
            
                    
            records[record].issueDate=decryptData(records[record].issueDate);
            
        
            records[record].expiryDate=decryptData(records[record].expiryDate);
            
                       
            records[record].identification_number=decryptData(records[record].identification_number);
            

            
        }
        // Sort the data to fetch based on how recently it is store in database
        const reversedrecords = records.reverse();
        res.json(reversedrecords);
        // res.json(records);
        
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
    
})


module.exports = router;
