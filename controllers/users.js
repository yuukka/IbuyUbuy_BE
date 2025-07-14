const User = require("../models/users")

module.exports = {
  createUser,
  currentUser
}

async function currentUser(req, res){
  const userId = req.auth.userId
  const user = await User.findOne({ user_id: userId })
  res.json({ user: user })
}

async function createUser(req, res){
  const userData = { ...req.body, user_id: req.auth.userId }
  const user = await User.create(userData)
  res.json({ user: user })
}