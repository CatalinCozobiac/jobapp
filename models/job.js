const { Schema} = require('mongoose');
const mongoose = require('mongoose')

//Schema 
const jobSchema = new Schema({
    name:String,
    details:String
    
   });
   
module.exports=mongoose.model('job', jobSchema);
  

