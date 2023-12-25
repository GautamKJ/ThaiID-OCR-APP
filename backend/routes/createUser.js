
const express = require('express');
const router = express.Router();
const User = require('../Schema/user_details');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const { detectText, encryptData } = require('./Module/ocrservices'); 

// Store the Image in uploadss
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload= multer({storage:storage});

const iv = Buffer.alloc(16, 0); 
 


// Create record by taking a image of thai ID from user to first detect it then store it in database

router.post('/create_user', upload.single('uploadedImage'), async (req, res) => {
  console.log(req.file);
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const extractedInfo = await detectText(fileBuffer);
    
    extractedInfo.image = req.file.filename;

      console.log("data ",extractedInfo);
      const isvalid=extractedInfo.isvalid=='true'?true:false;
    // Check if some field is missing
    console.log(isvalid);
    const Detection =
      extractedInfo.identification_number === 'undefined' ||
      extractedInfo.first_name === 'undefined' ||
      extractedInfo.lastName === 'undefined' ||
      extractedInfo.dob === 'undefined' ||
      extractedInfo.issueDate === 'undefined' ||
      extractedInfo.expiryDate === 'undefined'||
      extractedInfo.isvalid==='false';

    for (const prop in extractedInfo) {
      if (prop === 'status' || prop === 'image' ) continue;
    
      extractedInfo[prop] = encryptData(extractedInfo[prop]);
      console.log(`prop ${prop} --> ${extractedInfo[prop]}`);
    }

    
    // If the user is already present in the database, update the existing details

    let user = await User.findOne({ identification_number: extractedInfo.identification_number });
    if (user) {
      
      extractedInfo.status = 'Success';
      await User.replaceOne({ _id: user._id }, extractedInfo);
      console.log("Update" + user);
      res.json(user);
      return;
    }

    // Detection for card: logic is if identification_number is not found then failure
    if (Detection) {
      console.log("Fail");
      extractedInfo.status = 'Failure';
      const user = new User(extractedInfo);
      const newuser = await user.save();

      if(isvalid)
      res.json('Cannot Identify Thai ID Card. As some field is missing');
      else
      res.json("This is not belong to Thai ID Card")
    
      return;
    }
    else{

    extractedInfo.status = 'Success';

    console.log("Save");
    if(!isvalid)
    {
      extractedInfo.status = 'Failure';
    }
    // Save in the database
    user = new User(extractedInfo);
    const newuser = await user.save();
    if(!isvalid)
    {
      res.json("This is not belong to Thai ID Card") 
    }
    console.log('USER', newuser);
   
    res.json(newuser);
  }
  } catch (errors) {
    console.error(errors.message);
    res.status(500).json('Some error found '+errors.message);
  }
});

module.exports = router;


