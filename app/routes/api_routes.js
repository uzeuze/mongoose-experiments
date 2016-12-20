const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');


// User
router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUser);
router.get('/users/:userId', usersController.getUser);
router.put('/users/:userId', usersController.updateUser);
router.delete('/users/:userId', usersController.deleteUser);

// Board
router.get('/users/:userId/boards', usersController.getUserBoards);
router.post('/users/:userId/boards', usersController.createBoard);

module.exports = router;
