const { Schema} = require('mongoose');
const mongoose = require('mongoose')

//Schema 
const jobSchema = new Schema({
    subcontName:{
        type:String,
        required:true,
    },
    subcontEmail:{
        type:String,
        required:true,
    },
    jobLocation:{
        type:String,
        required:true,
    },
    
    jobDescription:{
        type:String,
        required:true,
    },
    img:{
        data: Buffer,
        contentType: String
    },

    date:{
        type:Date,
        default:Date.now,
    }
   });
   
module.exports=mongoose.model('Job', jobSchema);
  

