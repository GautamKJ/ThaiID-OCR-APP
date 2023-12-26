
const express = require('express');
const router = express.Router();
const User = require('../Schema/user_details');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');
const { detectText, encryptData } = require('./Module/ocrservices'); 
const _ = require('lodash');
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
    const fileBuffer = await fs.readFileSync(req.file.path);
    const userObject = await detectText(fileBuffer);
    
    // Make a copy of the extractedInfo object
    userObject.image = req.file.filename;

    // userObject encrypted that will save in database and extractedInfo will be send as a result to user on their page
    const extractedInfo = _.cloneDeep(userObject) ;
    

    userObject.image = req.file.filename;
    
    console.log("data ", userObject);
    const isvalid = userObject.isvalid === 'true' ? true : false;

    // Check if some field is missing
    console.log(isvalid);
    const Detection =
      userObject.identification_number === 'undefined' ||
      userObject.first_name === 'undefined' ||
      userObject.lastName === 'undefined' ||
      userObject.dob === 'undefined' ||
      userObject.issueDate === 'undefined' ||
      userObject.expiryDate === 'undefined' ||
      userObject.isvalid === 'false';

    for (const prop in userObject) {
      if (prop === 'status' || prop === 'image') continue;

      userObject[prop] = encryptData(userObject[prop]);
      console.log(`prop ${prop} --> ${userObject[prop]}`);
    }

    console.log("USERPBK ",userObject);
    // If the user is already present in the database, update the existing details
    
    let user = await User.findOne({ identification_number: userObject.identification_number });
    if (user && userObject.identification_number!='c46527a841911c8c2b1111928a097d23' ) {
      userObject.status = 'Success';
      extractedInfo.status='Success';
      await User.replaceOne({ _id: user._id }, userObject);
      console.log("Update");
      res.json(extractedInfo);
      return;
    }

    // Detection for card: logic is if identification_number is not found then failure
    if (Detection) {
      console.log("Fail");
      userObject.status = 'Failure';
      extractedInfo.status='Failure';
      const newUser = new User(userObject);
      const savedUser = await newUser.save();

      if (isvalid)
        res.json('Cannot Identify Thai ID Card. As some field is missing');
      else
        res.json("This does not belong to a Thai ID Card");

      return;
    } else {
      userObject.status = 'Success';
      extractedInfo.status='Success';

      console.log("Save");
      if (!isvalid) {
        userObject.status = 'Failure';
        extractedInfo.status='Failure';
      }
      // Save in the database
      const newUser = new User(userObject);
      const savedUser = await newUser.save();
      if (!isvalid) {
        res.json("This does not belong to a Thai ID Card");
      }
      console.log('USER', savedUser);

      res.json(extractedInfo);
    }
  } catch (errors) {
    console.error(errors.message);
    res.status(500).json('Some error found ' + errors.message);
  }
});


module.exports = router;


