const SubRedditModel = require('../models/SubRedditModel.js');

/**
 * SubRedditController.js
 *
 * @description :: Server-side logic for managing SubReddits.
 */
module.exports = {

  /**
   * SubRedditController.list()
   */
  list: (req, res) => {
    SubRedditModel.find(req.query.where, req.query.fields, req.query.sort, (err, SubReddits) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting SubReddit.',
          error: err
        });
      }
      return res.json(SubReddits);
    });
  },

  /**
   * SubRedditController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    SubRedditModel.findOne({_id: id}, (err, SubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting SubReddit.',
          error: err
        });
      }
      if (!SubReddit) {
        return res.status(404).json({
          message: 'No such SubReddit'
        });
      }
      return res.json(SubReddit);
    });
  },

  /**
   * SubRedditController.create()
   */
  create: (req, res) => {
    let SubReddit = new SubRedditModel({
			name : req.body.name,
			description : req.body.description
    });

    SubReddit.save((err, SubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating SubReddit',
          error: err
        });
      }
      return res.status(201).json(SubReddit);
    });
  },

  /**
   * SubRedditController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    SubRedditModel.findOne({_id: id}, (err, SubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting SubReddit',
          error: err
        });
      }
      if (!SubReddit) {
        return res.status(404).json({
          message: 'No such SubReddit'
        });
      }

      SubReddit.name = req.body.name ? req.body.name : SubReddit.name;
			SubReddit.description = req.body.description ? req.body.description : SubReddit.description;
			
      SubReddit.save( (err, SubReddit) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating SubReddit.',
            error: err
          });
        }

        return res.json(SubReddit);
      });
    });
  },

  /**
   * SubRedditController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    SubRedditModel.findByIdAndRemove(id, (err, SubReddit) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the SubReddit.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
