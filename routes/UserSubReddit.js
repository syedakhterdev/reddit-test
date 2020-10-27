const express = require('express');
const router = express.Router();
const UserSubRedditController = require('../controllers/UserSubRedditController.js');
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
  UserSubRedditController.list(req, res);
});

/*
 * GET USER's SubReddits
 */
router.get('/:id', (req, res) => {
  UserSubRedditController.getUserSubReddits(req, res);
});

/*
 * POST
 */
router.post('/', [
  // Both of these fields are required
  body('subRedditId').exists().withMessage('subRedditId is required'),
  body('userId').exists().withMessage('userId is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  UserSubRedditController.create(req, res);
});

/*
 * PUT
 */
// router.put('/:id', (req, res) => {
//   UserSubRedditController.update(req, res);
// });

/*
 * DELETE
 */
router.delete('/:id', (req, res) => {
  UserSubRedditController.remove(req, res);
});

module.exports = router;
