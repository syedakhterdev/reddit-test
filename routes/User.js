const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
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
  UserController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', (req, res) => {
  UserController.show(req, res);
});

/*
 * POST
 */
router.post('/',[
  // Name and email are required
  body('name').exists().withMessage('name is required'),
  body('email').exists().withMessage('email is required'),
  body('email').isEmail().withMessage('Enter valid email')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  UserController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', (req, res) => {
  UserController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', (req, res) => {
  UserController.remove(req, res);
});

module.exports = router;
