const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')

/** Student Routes  */
// router.get('/', userController.HomePage);
// router.get('/create_student', studentController.CreatePage);
// router.post('/create_student', studentController.CreateStudent);

router.get('/about', userController.AboutPage);
router.post('/about', userController.AboutPage);

// // Update
// router.get('/edit_student/:id', studentController.UpdateStudentPage);
// router.post('/edit_student/:id', studentController.UpdateStudent);



// //Delete
// router.get('/delete_student/:id', studentController.DeleteStudent);

// //register

router.get('/', userController.HomePage);
router.get('/register', userController.RegisterPage);
router.post('/register', userController.RegisterUser);

//login
//router.get('/', studentController.HomePage);
router.get('/login', userController.LoginPage);
router.post('/login', userController.LoginUser, userController.AdminCheck);

//logout
router.get('/logout', userController.LogoutUser);
module.exports=router