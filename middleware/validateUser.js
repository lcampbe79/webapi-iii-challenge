module.exports = validateUser;

function validateUser(req, res, next) {
  const validUser = req.body;
  if (!validUser.name) {
    res.status(400).json({message: "Missing required name field." })
    return
  }
  next();
}
