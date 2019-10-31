const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb')
const validateUser = require('../middleware/validateUser');
//const validateUserId = require('../middleware/validateUserId');


const router = express.Router();

router.post('/', validateUser, (req, res) => {
 
  Users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Error adding the user."})
  })  
})


router.post('/:id/posts', validateUserId, validatePost,(req, res) => {
  const text = req.body.text;
  const user_id = req.user.id; //doesn't return string **req.params.id returns as a string**

  Posts.insert({text, user_id})
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => res.sendStatus(500));//replaces .json()
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

router.get('/:id', validateUserId,(req, res) => {

  res.status(200).json(req.user)
  //const id = req.params.id
  // Users.getById(id)-->//from when declared in validateUserId
  // .then(user => {
  //   res.status(200).json(user)
  // })
  // .catch(error => {
  //   res.status(500).json({error: "The posts information could not be retrieved."})
  // })
});

router.get('/:id/posts', validateUserId,(req, res) => {
  Users.getUserPosts(req.user.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.sendStatus(500));

  //BECAUSE of validateuserid
  // const userId = req.params.id;
  // if (isNaN(userId)) {
  //   return res.status(400).json({ error: "You didn't give a valid user id!" });
  // }
  // Users.getById(req.params.id)
  //   .then(post => {
  //     if (!post.length) {
  //       return res
  //         .status(404)
  //         .json({ message: "There is no post with this id!", id: userId });
  //     }
  //     Users.getUserPosts(userId).then(posts => {
  //       if (!posts.length) {
  //         return res.status(404).json({ message: "No comments!" });
  //       }
  //       return res.status(200).json(posts);
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: "We couldn't add the posts into the database. Internal error x_x"
  //     });
  //   });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(response => res.sendStatus(204))
    .catch(err=> res.status(500).json({error: "The post with the id could not be retrieved."}));
  // const {id} = req.params;
  
  // Users.remove(id)
  // .then(users => {
  //   if (users) {
  //     res.status(200).json(users)
  //   } else {
  //     res.status(404).json({errorMessage: "The post with the specified ID does not exist."})
  //     return
  //   }
  // })
  
  // .catch(err => {
  //   res.status(500).json({error: "The post with the id could not be retrieved."})
  // })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.user.id;//instead of req.params.id to make sure is user
  console.log(typeof req.user.id)
  console.log(typeof req.params.id)
  Users.update(id, req.body)
    .then(success => {
      Users.getById(id)
        .then(userObj => res.status(200). json(userObj))
    })
    .catch(err => res.sendStatus(500));
});

//custom middleware
function validateUserId(req, res, next) {
  const userId = req.params.id;
  console.log(userId)
  Users.getById(userId)
  .then(user => {
    if (user) {
      req.user = user
      next();
    } else {
      res.status(404).json({message: `No user with  id ${userId} not found`})
    } 
  })
  .catch(err => res.status(500).json({message: "Server error retrieving id"}))
};

function validatePost(req, res, next) {
  //const validUser = req.body;
  if(!req.body) {
    return res.status(400).json({message: "No post data provided." }) 
  } 
  if (!req.body.text) {
    return res.status(400).json({message: "Missing required text field." }) 
  } 
   next();
};

module.exports = router;
