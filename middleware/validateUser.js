module.exports = validateUser;

function validateUser(req, res, next) {
  const validUser = req.body;
  if(!validUser) {
    res.status(400).json({message: "No User data provided." }) 
  } else if (!validUser.name) {
    res.status(400).json({message: "Missing required name field." }) 
  } else {
    Users.get()
    .then(users => {
      if (users.find((item) => item.name === req.body.name)) {
        return res.status(400).json({error: "User with this name already exists."})
      }
      next();
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Internal server error.", source: "Validate User Middleware"})
    })
  }

}
