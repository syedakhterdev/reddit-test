const UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

  /**
   * UserController.list()
   */
  list: (req, res) => {
    UserModel.find(req.query.where, req.query.fields, req.query.sort, (err, Users) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }
      return res.json(Users);
    });
  },

  /**
   * UserController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    UserModel.findOne({_id: id}, (err, User) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }
      if (!User) {
        return res.status(404).json({
          message: 'No such User'
        });
      }
      return res.json(User);
    });
  },

  /**
   * UserController.create()
   */
  create: (req, res) => {
    let dob = new Date(req.body.dob)
    let User = new UserModel({
			name : req.body.name,
			email : req.body.email,
			gender : req.body.gender,
			dob : dob ? dob : undefined,
      username : req.body.username
    });

    User.save((err, User) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating User',
          error: err
        });
      }
      return res.status(201).json(User);
    });
  },

  /**
   * UserController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    UserModel.findOne({_id: id}, (err, User) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User',
          error: err
        });
      }
      if (!User) {
        return res.status(404).json({
          message: 'No such User'
        });
      }

      User.name = req.body.name ? req.body.name : User.name;
			User.email = req.body.email ? req.body.email : User.email;
			User.gender = req.body.gender ? req.body.gender : User.gender;
			User.dob = req.body.dob ? req.body.dob : User.dob;
      User.username = req.body.username ? req.body.username : User.username;
      User.notificationTime = req.body.notificationTime && req.body.notificationTime <= 23 ? req.body.notificationTime : User.notificationTime
      User.notification = req.body.notification !== undefined ? req.body.notification : User.notification
			
      User.save( (err, User) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating User.',
            error: err
          });
        }

        return res.json(User);
      });
    });
  },

  /**
   * UserController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    UserModel.findByIdAndRemove(id, (err, User) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the User.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
