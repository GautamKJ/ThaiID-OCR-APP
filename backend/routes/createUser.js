const express= require("express");
const router = express.Router();
const User=require('../Schema/user_details');
const multer=require('multer');
const vision = require('@google-cloud/vision');
const fs = require('fs');

const CREDENTIAL = JSON.parse(
    JSON.stringify({
      // Your JSON key data
      "type": "service_account",
    "project_id": "ocrthai-409016",
    "private_key_id": "0677f5329048cec5eba569d541e2d4bd95364d8c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRrUpJrjGagleI\nfLZa14OfXUSJd/A1xau/Wp3KvnUlNurHxvue9t8n6cCTyq3TCB+mHuFl85VCQrAk\nbqWPT8XOlxMSZdiPyrcxho5FCRGeMe5c9sJ3XqIUYeLfhF1lCj2OvP3I0Pqel5Bf\nLT64evMtXY7OkD9gF2v81mJh/W4GwHLFaR+PeH9D36wBDP+vR+b7fGUcMumrioU/\nxOhUgrtZR7A7MEKpGcWRa2HpVkJ5nM/8r78oryCUt/x8ArKSWuAiApTCOkiSocIj\nn04DrAnAfz8+ulG4kpwn75Wk9KzbNpO+f27B7HsAqZDhJ+FknBYYNvqi/F4PzQjG\nC4ohWhEfAgMBAAECggEAIknEJ2FmON34wi1MGss5zy1O4Gtt1jVG5+oXJLOu73uC\nuvxmDcb8PjLXwbNivUBhAJGgisNhv1itelUNG5mlf3+taD73F6iZpZkwmccpC5Af\nFTJrIbR8LSNxbjDfSanPiuXgBd9wJHrPlVOOTq0YfZeE8MWeVNtFAa9DSRf1pAJi\nWSykrvvza7La790aB9bFzvbw8dx2jh7waSaSabmh7Is6zwlzG56tSHXD/26n4OCY\nDTGzOkMk9YqjAau+RCnJF1fzMWGLLbNUQLeky/7GROKfvr4VohmUWzJKEraPJADv\nSPp26woBqkQbItz+SIJgrR5dZHM4cTplj3/IB+Qt9QKBgQD4GxrB7pd6O6aXwliZ\nSvOWmrhg+F3ytji5T2hOqPT0dBqW/PQdpyufJ0rsuVcuBNEMyjTEjIFRLxfceQUN\nKdnytMcht0gEh3FbwHnqwbRl3JTSwvKwt66pPzDucoPJxudpORcTt+qr9Tcvyoos\nHmieW8qouUvuX5NUB6C4lhenkwKBgQDYWSuiMl3xSDOR5ZTqYmpGQ6Ev7vHKS7Pj\nMdUJW7TtkWGV7Skbcnd2WU0gllcWeVCx4Vix9HfQgNaeLtZUbAB3LOlorxFSQzUp\nmx6ZekdunVw95TFdAktvm7CnJjIdn+kXJqJkLweTmX/v+gIlI/qtF21i/AYQwlDN\nQBNAnCmPxQKBgQDMHpCPCNp65+SRaoU16OIq/7O9o9i3PI/CdcAdJwgQrgzKN+Yn\nF0feMpeD1qAQ7kmHOjzbj7U8s3/wFWjAgbQb5/sElCOeBkiO8fXb2+2s+CNAmr7M\nAPKjr6d0JaajNQ9iFGQWBvP88Uur9/hhf8sWrfI3iescfGlbcsMZ2fIwHQKBgQCu\nB9zPllB3PKsvG0yU1iHC77gDhOQ+5HKJuZYy9vAtghrLrYC5sXRjYSZnpkfbri65\nSBo+2/ZdZKY/jFGgi1g8hYYkTV9TmvhyxXLx5qj7U93VdD4nISdpWgXaDyGVLwMj\nOlK64BHqKzn84lFDaxPElOnLDAwdAxJYaMiT2oqcOQKBgBfclXiJ361Fhx/Cj5tF\nGGF3LK8DEaYxnokTYpFxZGVnO49yi85tSEhQypx19Ra9s9jlaCagVgpsrxAylpRE\n/aTnQm9EvYN3EVvsEB1UMSoZ5V9YMAb1aLVjFIN+wI7SaGMqnbR1aVmX+aJEraCC\ni3G6D+vMr5iwROWbDMDSnaqa\n-----END PRIVATE KEY-----\n",
    "client_email": "ocr-129@ocrthai-409016.iam.gserviceaccount.com",
    "client_id": "113751486915530338081",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ocr-129%40ocrthai-409016.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
    })
  );
  
  const Config = {
    credentials: {
      private_key: CREDENTIAL.private_key,
      client_email: CREDENTIAL.client_email,
    },
  };
  
  const client = new vision.ImageAnnotatorClient(Config);
// ocr();

// createUser.js
console.log('CreateUser route file executed.');


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload= multer({storage:storage});


// Extract 
var extractedInfo = {
    identification_number: '',
    first_name: '',
    lastName: '',
    dob: '',
    issueDate: '',
    expiryDate: '',
  };
const extractInfoFromOCR = (annotations) => {
   
    const highConfidenceText = annotations
      .filter((annotation) => annotation.confidence >= 0.98)
      .map((annotation) => annotation.description)
      .join('\n');

    console.log('Extracted Text (High Confidence):', highConfidenceText);
    extractedInfo = {
        identification_number: '',
        first_name: '',
        lastName: '',
        dob: '',
        issueDate: '',
        expiryDate: '',
      };
        
    const lines = annotations[0].description.split('\n');
let prev_line='';
    console.log(lines);
  
    lines.forEach((line) => {
        // console.log(prev_line);
      

        

        const idCardNumberMatch = line.match(/(\d{1} \d{4} \d{5} \d{2} \d{1})/);
        if (idCardNumberMatch !== null) {
          extractedInfo.identification_number = idCardNumberMatch[0];
        }
        
  
    //   if (line.includes('Name')) {
        const nameMatch = line.match(/Name (.+)/);
        
        if(nameMatch!=null)
        extractedInfo.first_name = nameMatch[1];
    //   }
  
      
        const lastNameMatch = line.match(/Last name (.+)/);
        // console.log("NAme ",lastNameMatch);
        if(lastNameMatch!=null)
        extractedInfo.lastName = lastNameMatch ? lastNameMatch[1] : '';
      
        const issueDateMatch = line.match(/(\d+ [A-Z][a-z]+ \d{4})/);
        // console.log("exc ",expiryDateMatch);
        if(issueDateMatch!=null && extractedInfo.issueDate=='' && extractedInfo.dob!='')
        extractedInfo.issueDate =issueDateMatch[1];
      
        const dobMatch = line.match(/Date of Birth (\d+ \S+ \d{4})/);
        if(dobMatch!=null && extractedInfo.dob=='')
        extractedInfo.dob = dobMatch ? dobMatch[1] : '';
      
  
    //   if (line.includes('Date of Issue')) {
    //     const issueDateMatch = prev_line.match(/(\d+ \S+ \d{4})/);
    //     console.log("asdfa ",issueDateMatch);
    //     extractedInfo.issueDate = issueDateMatch[0];
    //   }
    
  
    //   if (line.includes('Date of Expiry')) {
        const expiryDateMatch = line.match(/(\d+ \S+ \d{4})/);
        // console.log("exc ",expiryDateMatch);
        if(expiryDateMatch!=null)
        extractedInfo.expiryDate =expiryDateMatch[1];
    //   }
      prev_line=line;
    });
  
    return extractedInfo;
    
  };
// Detect text from image

const detectText = async (file_path) => {
    try {
      const imageBuffer = fs.readFileSync(file_path);
  
      const [result] = await client.textDetection(imageBuffer);
      const annotations = result.textAnnotations;
  
      const extractedInfo = extractInfoFromOCR(annotations);
  
      console.log('Extracted Information:', extractedInfo);
      return extractedInfo;
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

router.post('/create_user',upload.single('uploadedImage'), async(req,res)=>{
    console.log(req.file);
    try{

        
 
     await detectText(req.file.path);
    //  if user already present the update the existing detail
     let user=await User.findOne({identification_number:extractedInfo.identification_number});
     if(user){

        const updatedata={};
        
        await User.replaceOne({ _id: user._id }, extractedInfo);
         res.json(user);

         return;
     }
     console.log("here");
     user = new User(extractedInfo);
     const newuser= await user.save();
    // res.json(extractedInfo);
       res.json(newuser);

   
   }
   catch(errors){
       console.error(errors.message);
       res.status(500).json("Some error found");
   }

});

module.exports = router;