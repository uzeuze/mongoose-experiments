const usersController = {};
const User = require('../models/user');

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
      res.status(404).json({ error: 'No Users'});
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

module.exports = usersController;
