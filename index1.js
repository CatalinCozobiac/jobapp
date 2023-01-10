require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const res = require('express/lib/response');
const app = express()
const { Schema } = mongoose;
var port=3000
//Schema 
const studentSchema = new Schema({
  name:String,
  age:Number
 });

 //Modle 
const Student=mongoose.model('student', studentSchema)

// Database connection
mongoose.connect(process.env.DATABASE_URI,{
  useUnifiedTopology:true,
  useNewUrlParser:true
})
.then(() =>{console.log('database connected')})
.catch ((err)=>{
  console.log(`database not connected ->${err.message}`)
})

//routes

//index
app.get('/', (req,res)=> res.send ('Welcome Home from index2'));
// student -> localhost:3000/students
app.route('/students').get(function(req, res) {
  Student.find({},(err, result)=>{
    if (!err){
      res.send(result);
    }else{
      console.log(err)
      res.send('Some Error')
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})