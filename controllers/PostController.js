const PostModel = require('../models/PostModel.js');

/**
 * PostController.js
 *
 * @description :: Server-side logic for managing Posts.
 */
module.exports = {

  /**
   * PostController.list()
   */
  list: (req, res) => {
    PostModel.find(req.query.where, req.query.fields, req.query.sort, (err, Posts) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Post.',
          error: err
        });
      }
      return res.json(Posts);
    });
  },

  /**
   * PostController.postsBySubreddit()
   */
  postsBySubreddit: async (req, res) => {
    let id = req.params.id;
    try {
      let posts =  await PostModel.find({ subRedditId: id })
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          message: 'No such posts'
        });
      }
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting posts.'
      });
    }
  },

  /**
   * PostController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    PostModel.findOne({_id: id}, (err, Post) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Post.',
          error: err
        });
      }
      if (!Post) {
        return res.status(404).json({
          message: 'No such Post'
        });
      }
      return res.json(Post);
    });
  },

  /**
   * PostController.create()
   */
  create: (req, res) => {
    let Post = new PostModel({
			title : req.body.title,
			description : req.body.description,
      subRedditId: req.body.subRedditId
    });

    Post.save((err, Post) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Post',
          error: err
        });
      }
      return res.status(201).json(Post);
    });
  },

  /**
   * PostController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    PostModel.findOne({_id: id}, (err, Post) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Post',
          error: err
        });
      }
      if (!Post) {
        return res.status(404).json({
          message: 'No such Post'
        });
      }

      Post.title = req.body.title ? req.body.title : Post.title;
			Post.description = req.body.description ? req.body.description : Post.description;
      Post.subRedditId =  req.body.subRedditId ? req.body.subRedditId : Post.subRedditId 
			
      Post.save( (err, Post) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Post.',
            error: err
          });
        }

        return res.json(Post);
      });
    });
  },

  /**
   * PostController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    PostModel.findByIdAndRemove(id, (err, Post) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Post.',
          error: err
        });
      }
      return res.status(204).json();
    });
  },

   /**
   * PostController.addVote()
   */
  addVote: (req, res) => {
    let id = req.params.id;
    PostModel.findOne({_id: id}, (err, Post) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Post',
          error: err
        });
      }
      if (!Post) {
        return res.status(404).json({
          message: 'No such Post'
        });
      }

      Post.votes =  Post.votes + 1
			
      Post.save( (err, Post) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when adding vote to Post.',
            error: err
          });
        }
        return res.json(Post);
      });
    });
  },

     /**
   * PostController.deductVote()
   */
  deductVote: (req, res) => {
    let id = req.params.id;
    PostModel.findOne({_id: id}, (err, Post) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Post',
          error: err
        });
      }
      if (!Post) {
        return res.status(404).json({
          message: 'No such Post'
        });
      }

      Post.votes =  Post.votes ?  Post.votes - 1 : Post.votes
			
      Post.save( (err, Post) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when subtracting vote from Post.',
            error: err
          });
        }
        return res.json(Post);
      });
    });
  },


};
