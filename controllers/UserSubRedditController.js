const UserSubRedditModel = require('../models/UserSubRedditModel.js');

/**
 * UserSubRedditController.js
 *
 * @description :: Server-side logic for managing UserSubReddits.
 */
module.exports = {

  /**
   * UserSubRedditController.list()
   */
  list: (req, res) => {
    UserSubRedditModel.find(req.query.where, req.query.fields, req.query.sort, (err, UserSubReddits) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting UserSubReddit.',
          error: err
        });
      }
      return res.json(UserSubReddits);
    });
  },

  /**
   * UserSubRedditController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    UserSubRedditModel.findOne({_id: id}, (err, UserSubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting UserSubReddit.',
          error: err
        });
      }
      if (!UserSubReddit) {
        return res.status(404).json({
          message: 'No such UserSubReddit'
        });
      }
      return res.json(UserSubReddit);
    });
  },

  /**
   * UserSubRedditController.getUserSubReddits()
   */
  getUserSubReddits: async (req, res) => {
    let id = req.params.id;
    try {
      let UserSubReddits =  await UserSubRedditModel.find({ userId: id }).populate('subRedditId')
      if (!UserSubReddits || UserSubReddits.length === 0) {
        return res.status(404).json({
          message: 'No such UserSubReddit'
        });
      }
      return res.json(UserSubReddits);
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting UserSubReddit.'
      });
    }
  },

  /**
   * UserSubRedditController.create()
   */
  create: (req, res) => {
    let UserSubReddit = new UserSubRedditModel({
			userId : req.body.userId,
			subRedditId : req.body.subRedditId
    });

    UserSubReddit.save((err, UserSubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating UserSubReddit',
          error: err
        });
      }
      return res.status(201).json(UserSubReddit);
    });
  },

  /**
   * UserSubRedditController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    UserSubRedditModel.findOne({_id: id}, (err, UserSubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting UserSubReddit',
          error: err
        });
      }
      if (!UserSubReddit) {
        return res.status(404).json({
          message: 'No such UserSubReddit'
        });
      }

      UserSubReddit.userId = req.body.userId ? req.body.userId : UserSubReddit.userId;
			UserSubReddit.subRedditId = req.body.subRedditId ? req.body.subRedditId : UserSubReddit.subRedditId;
			
      UserSubReddit.save( (err, UserSubReddit) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating UserSubReddit.',
            error: err
          });
        }

        return res.json(UserSubReddit);
      });
    });
  },

  /**
   * UserSubRedditController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    UserSubRedditModel.findByIdAndRemove(id, (err, UserSubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the UserSubReddit.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
