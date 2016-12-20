const usersController = {};
const User = require('../models/user');
const Board = require('../models/board');

usersController.createUser = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let isAdmin = req.body.isAdmin;

  if(!email || !name) {
    // Unprocessable Entity if email or name not given
    return res.status(422).json({ error: 'You must provide name and email'});
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if(err) { return next(err); }

    // if a user exists return error
    if(existingUser) {
      return res.status(422).json({ error: 'Email is in use' });
    }

    // if user does not exist create new user
    let user = new User({
      name: name,
      email: email,
      isAdmin: isAdmin
    });

    user.save((err, user) => {
      if(err) { return next(err); }

      res.json(user);
    });
  });
};

usersController.getUsers = (req, res) => {
  User.find({}, (err, docs) => {
    if(err) { return next(err); }
    if(docs && docs.length) {
      res.json(docs);
    } else {
      // returns empty array
      res.json(docs);
    }
  });
};

usersController.getUser = (req, res) => {
  let userId = req.params.userId;
  User.findOne({ _id: userId }, (err, doc) => {
    if(err) { return next(err); }
    res.json(doc);
  });
}

usersController.deleteUser = (req, res) => {
  let userId = req.params.userId;
  User.remove({ _id: userId }, (err) => {
    if(err) { return next(err) }
    return res.json({ message: 'User deleted'});
  });
}

usersController.updateUser = (req, res) => {
  let userId = req.params.userId;
  let name = req.body.name;
  let email = req.body.email;
  let isAdmin = req.body.isAdmin;

  if(!email || !name) {
    // Unprocessable Entity if email or name not given
    return res.status(422).json({ error: 'You must provide name and email'});
  }

  User.findOne({email: email}, (err, existingUser) => {
    if(err) { return next(err); }

    // if a user exists return error
    if(existingUser) {
      return res.status(422).json({ error: 'Email is in use' });
    }

    User.findOne({ _id: userId }, (err, doc) => {
      if(err) { return next(err); }
      doc.name = name;
      doc.email = email;
      doc.isAdmin = isAdmin;
      doc.save(function (err, updatedDoc) {
        if (err) { return next(err); }
        res.json(updatedDoc);
      });
    });
  });
}

usersController.createBoard = (req, res) => {
  let userId = req.params.userId;
  let boardName = req.body.name;
  if(!boardName){
    return res.status(422).json({ error: 'You must provide name'});
  }
  User.findOne({ _id: userId }, (err, doc) => {
    if(err) { return next(err); }
    let board = new Board({
      name: boardName
    });
    board.users.push(doc);
    doc.boards.push(board);
    doc.save((err, user) => {
      if(err) { return next(err); }
      board.save((err) => {
        if(err) { return next(err); }
        res.json(user);
      });
    });
  });

}

module.exports = usersController;
