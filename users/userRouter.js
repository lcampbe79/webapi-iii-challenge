const express = require('express');

const Users = require('./userDb');
const validateUser = require('../middleware/validateUser');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "Error adding the user"})
  })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "Error getting the users."})
  })
});

router.get('/:id', (req, res) => {
  
  Users.getById(req.params.id)
  .then(user => {
    if (!user.id) {
      res.status(400).json({message: "The user with the specified ID does not exist."})
    } else {
      res.status(200).json(user)
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: "The posts information could not be retrieved."})
  })
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
