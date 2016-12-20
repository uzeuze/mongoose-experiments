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

boardsController.assignUserToBoard = (req, res) => {
  let boardId = req.params.boardId;
  let userId = req.body.userId;
  if(!userId) {
    res.status(422).json({ error: 'You must select a user'});
  }

  Board.findOne({_id: boardId}, (err, board) => {
    if(err) { return next(err); }
    User.findOne({_id: userId}, (err, user) => {
      if(err) { return next(err); }
      board.users.push(user);
      board.save((err) => {
        if(err) { return next(err); }
        res.json(board);
      });
    });
  });
}

module.exports = boardsController;
