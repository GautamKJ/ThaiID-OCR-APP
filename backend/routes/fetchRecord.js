const express= require("express");
const User=require('../Schema/user_details');
const router = express.Router();
// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data



// protected data

// secret key generate 32 bytes of random data
const Securitykey = "@s!8h0ie2#89m-_=~g>{p6./R02A#srk";
let initVector = crypto.randomBytes(16);


router.get('/fetchrecord', async (req,res)=>{
   
    try {
        const users = await User.find();

        for (let record = 0; record < users.length; record++) {
            console.log("gautam ", users[record]);
            // Retrieve the initialization vector (iv) for each user
            let iv = users[record].iv;
            {
            let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
            let decryptedData = decipher.update(users[record].first_name, "hex", "utf-8");
            decryptedData += decipher.final("utf8");
            users[record].first_name=decryptedData;
            }

            {
                let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
                let decryptedData = decipher.update(users[record].lastName, "hex", "utf-8");
                decryptedData += decipher.final("utf8");
                users[record].lastName=decryptedData;
                }

                {
                    let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
                    let decryptedData = decipher.update(users[record].issueDate, "hex", "utf-8");
                    decryptedData += decipher.final("utf8");
                    users[record].issueDate=decryptedData;
                    }

                    {
                        let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
                        let decryptedData = decipher.update(users[record].expiryDate, "hex", "utf-8");
                        decryptedData += decipher.final("utf8");
                        users[record].expiryDate=decryptedData;
                        }
        
                                {
                        let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
                        let decryptedData = decipher.update(users[record].identification_number, "hex", "utf-8");
                        decryptedData += decipher.final("utf8");
                        users[record].identification_number=decryptedData;
                        }
            
        }
        
        res.json(users);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
    
})


module.exports = router;
