const mongoose= require('mongoose');
const {Schema}=mongoose;
const userSchema= new Schema({

    identification_number:{
        type:String,
        
    },

    first_name:{
        type:String,
        
    },
    lastName:{
        type:String,
        
    },
    dob:{
        type:String,
        
    },
    issueDate:{
        type:String,
        
    },
    expiryDate:{
        type:String,
        
    },
    image:{
        type: String,
        contentType: String,
        required:true
    },
    status:{
       type:String,
       default:'Success'
    },
    
    date:{
        type:Date,
        default:new Date
        
    }

})

// Now, we need to export and create our Model. So call the module. exports and we want to export the mongoose model and we need to specify arguments to this model() method. The first argument is gonna be the name of the model. So let’s name our model as “Employee“, and the second argument is our Schema that is employeeSchema.

const User=mongoose.model('user',userSchema);;
User.createIndexes();
module.exports=User;

