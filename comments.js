// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for GET /comments/:id
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const { Comment } = require('./models');

const app = express();

app.use(bodyParser.json());

// 2. Create a route for GET /comments
app.get('/comments', (req, res) => {
  Comment
    .find()
    .then(comments => {
      res.status(200).json({
        message: 'Successfully got comments',
        comments: comments
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Internal server error'
      });
    });
});

// 3. Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
  Comment
    .findById(req.params.id)
    .then(comment => {
      res.status(200).json({
        message: 'Successfully got comment',
        comment: comment
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Internal server error'
      });
    });
});

// 4. Create a route for POST /comments
app.post('/comments', (req, res) => {
  const requiredFields = ['text', 'author'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      return res.status(400).json({ message: message });
    }
  }

  Comment
    .create({
      text: req.body.text,