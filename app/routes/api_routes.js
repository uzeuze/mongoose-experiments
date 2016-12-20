const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const boardsController = require('../controllers/boards_controller');

// User
router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUser);
router.get('/users/:userId', usersController.getUser);
router.put('/users/:userId', usersController.updateUser);
router.delete('/users/:userId', usersController.deleteUser);
router.get('/users/:userId/boards', usersController.getUserBoards);
router.post('/users/:userId/boards', usersController.createBoard);

// Board
router.get('/boards', boardsController.getBoards);
router.get('/boards/:boardId', boardsController.getBoard);
router.post('/boards/:boardId/users', boardsController.assignUserToBoard);

module.exports = router;
