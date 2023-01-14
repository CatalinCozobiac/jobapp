const express = require('express');
const router = express.Router()
const store = require('../middleware/uploader')
const userController = require('../controllers/userController')

// /** Job Routes  */
router.get('/', userController.HomePage);

router.get('/dashboard', userController.DashBoard);
router.post('/dashboard', userController.DashBoard);

router.get('/create_job', userController.CreatePage);
router.post('/create_job', userController.upload, userController.CreateJob);

// // Update
router.get('/edit_job/:id', userController.UpdateJobPage);
router.post('/edit_job/:id', userController.UpdateJob);



// //Delete
router.get('/delete_job/:id', userController.DeleteJob);

// //register

router.get('/', userController.HomePage);
router.get('/register', userController.RegisterPage);
router.post('/register', userController.RegisterUser);

//login

router.get('/login', userController.LoginPage);
router.post('/login', userController.LoginUser);

//logout
router.get('/logout', userController.LogoutUser);

module.exports=router