const boardsController = {};
const User = require('../models/user');
const Board = require('../models/board');

boardsController.getBoards = (req, res) => {
  Board.find({}, (err, docs) => {
    if(err) { return next(err) }
    res.json(docs);
  });
}

boardsController.getBoard = (req, res) => {
  let boardId = req.params.boardId;
  Board
    .findOne({ _id: boardId })
    .populate('users')
    .exec((err, board) => {
      if(err) { return next(err); }
      res.json(board);
    });
}

module.exports = boardsController;
