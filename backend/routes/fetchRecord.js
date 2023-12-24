const express= require("express");
const User=require('../Schema/user_details');
const router = express.Router();



router.post('/fetchrecord', async (req,res)=>{
   
    try {
        let users= await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
    
})


module.exports = router;