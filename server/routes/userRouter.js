/* Import statement for modules */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* Provides routing for the user functions */
router.get('/get-all-users', userController.getUsers);
router.get('/get-user/:id', userController.getUserById);
// router.post('/create-user', userController.createUser);
router.put('/edit-user/:id', userController.editUser); 

router.post('/signin', userController.signIn);
router.get('/get-user-by-email/:email', userController.getUserByEmail);
router.post('/signup', userController.newAccount);

module.exports = router;
