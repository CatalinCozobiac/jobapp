require ('../models/database')
const { name } = require('ejs');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const Job = require('../models/job');
const User  = require('../models/user')
const bcrypt = require('bcrypt');
const morgan = require('morgan');
var multer = require('multer');
const path = require("path");
const fs = require('fs');


//const e = require('connect-flash');

var sessionChecker= async (req, res, next)=>{
    //console.log(req)
    if(req.cookies.user_sid && !req.session.user){
        const jobs = await Job.find({})
        res.render('student_data', { session: req.session.user, jobs: {jobs}})
    }else {
        next()
    }


}

//for image storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

exports.HomePage= async (req, res) =>{
    const jobs = await Job.find({})
    console.log(jobs)
    res.render('index', { session: req.session.user, jobs: {jobs}});


}

exports.DashBoard= async (req, res) =>{
    const jobs = await Job.find({})
    console.log(jobs)
    res.render('dashboard', { session: req.session.user, jobs: {jobs}});

    

}
// create form view
exports.CreatePage = (sessionChecker, (req, res) =>{

    if(!req.cookies.user_sid && req.session.user){
        res.render('login', {user: req.user,session: req.session.user})
    }else {
        res.render('create_job',{ session: req.session.user})


    }



})

// submit form (store data in database)
exports.upload= upload.single('images');

exports.CreateJob= async (req, res, next)=>{
    const files = req.files;

   //console.log(req.body);
    let name =req.body.name
    let email =req.body.email
    let location = req.body.location
    let jobd = req.body.jobd
    let img =  {
        data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        contentType: 'image/png'
    }
    if(name !=''&& email !=''&& location  !='' && jobd !='' && img!=''){
        const job = new Job({
            subcontName:name,
            subcontEmail:email,
            jobLocation:location,
            jobDescription:jobd,
            img:img,

        })
            job.save()
        }else{
            res.render('dashboard', { session: req.session.user, jobs: {jobs}});
    }
    console.log('job data created')
    const jobs = await Job.find({})
    res.render('dashboard', { session: req.session.user, jobs: {jobs}});

}

// Edit Job
exports.UpdateJobPage= async (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const job = await Job.findById({_id:id})
    res.render('edit_job', { session: req.session.user,job: {job}});

}
// Edit Student Action
exports.UpdateJob=async (req, res)=>{

    try {
        const job = await Job.updateOne({
            _id:req.params.id, 
            subcontName:req.body.name, 
            subcontEmail:req.body.email,
            jobLocation:req.body.location,
            jobDescription:req.body.jobd,})

            
        console.log(job)
        const jobs = await Job.find({})
        res.render('dashboard', { session: req.session.user,jobs: {jobs}})
    } catch (error) {
        console.log(error)

    }
}


// Delete
exports.DeleteJob=async(req, res)=>{
    if(!req.cookies.user_sid && req.session.user){
        res.render('login',{ session: req.session.user})
    }
    console.log(req.params.id);
    const id = req.params.id;
    const job =await Job.deleteOne({ _id: id });
    console.log(job);
    const jobs = await Job.find({})
    res.render('dashboard', { session: req.session.user,jobs: {jobs}})

}
// create form view
exports.RegisterPage=(req, res)=>{

    res.render('register',{ session: req.session.user });
}
//User
exports.RegisterUser= async (req,res)=>{
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);
// Store hash in your password DB.
    console.log(req.body)
    //User.findOne({email:req.body.email}).then((User)); {
    const user = await User.findOne({email:req.body.email})
    if (user){
        console.log(user)
        return res.status(400).json({email: "A user already registered"})
    }else {
// or create new user
        const newUser =new User({
            userName:req.body.name,
            email:req.body.email,
            password: hash,

        });
            newUser.save()
            res.render("login", {  session: req.session.user})
        }

    //Login

    }

    exports.LoginPage = async (req,res)=>{
        res.render('login',{ session: req.session.user});

    }

    exports.LoginUser = async (req,res)=>{

        const user =  await User.findOne({email:req.body.email})

        if (!user){
            
            res.render('login', { session: req.session.user})
            return;
        }

        await user.comparePassword(req.body.password, async(error,match)=>{
            const jobs = await Job.find({})
            
            if (!match){
                console.log("fail")
                res.render("login", {  session: req.session.user})
                return;
            }
                    req.session.user = user
                    res.render('dashboard', {  session: req.session.user, jobs:{jobs}})
                    console.log("success") 
        })
        
    }


    //logout

    exports.LogoutUser= async(req,res)=>{
        console.log(req.cookies.user_sid)
        if(req.cookies.user_sid && req.session.user){
            res.clearCookie('user_sid')
               //res.session.destroy()
            res.redirect('./login' /*, { session: req.session.user}*/)
        }else{
            res.redirect('./login')
        }
        }
