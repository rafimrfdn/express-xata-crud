const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/create-user', userController.createUser);
router.get('/all', userController.getAllUsers);

router.get('/users/:id/edit', userController.getUserForUpdate);  // Route to get user for update form
router.patch('/users/:id', userController.updateUser); // Update user route

router.delete('/users/:id', userController.deleteUser); // Delete user route

module.exports = router;
