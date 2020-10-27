const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController.js');

const { body, validationResult } = require('express-validator');

/*
 * MIDDLEWARE
 */
router.use((req, res, next ) => {
let query = {};  

if(req.query.where)
  query.where = JSON.parse(req.query.where);

if(req.query.fields)
  query.fields = JSON.parse(req.query.fields);

if(req.query.sort)
  query.sort = {sort : JSON.parse(req.query.sort)};
else
  query.sort = {};

if(req.query.limit)
  query.sort.limit = parseInt(req.query.limit);

if(req.query.skip)
  query.sort.skip = parseInt(req.query.skip);

req.query = query;

next();
})

/*
 * GET
 */
router.get('/', (req, res) => {
  PostController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', (req, res) => {
  PostController.show(req, res);
});

/*
 * POST
 */
router.post('/', [
      // Both of these fields are required
      body('subRedditId').exists().withMessage('subRedditId is required'),
      body('title').exists().withMessage('title is required')
    ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  PostController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', (req, res) => {
  PostController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', (req, res) => {
  PostController.remove(req, res);
});

/*
 * ADD VOTE
 */
router.get('/addVote/:id', (req, res) => {
  PostController.addVote(req, res);
});

/*
 * DEDUCT VOTE
 */
router.get('/deductVote/:id', (req, res) => {
  PostController.deductVote(req, res);
});

/*
 * Posts by Subreddit
 */
router.get('/postsBySubreddit/:id', (req, res) => {
  PostController.postsBySubreddit(req, res);
});

module.exports = router;
