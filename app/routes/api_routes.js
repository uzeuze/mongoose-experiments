const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');


// User
router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUser);


module.exports = router;
