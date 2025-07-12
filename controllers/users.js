const User = require("../models/users")

module.exports = {
  createUser,
  currentUser
}

async function currentUser(req, res){
  console.log('here at auth', req.auth)
  const userId = req.auth.userId
  const user = await User.findOne({ user_id: userId })
  res.json({ user: user })
}

async function createUser(req, res){
   console.log('here at createUser', req.auth);
  const userData = { ...req.body, user_id: req.auth.userId }
  const user = await User.create(userData)
  res.json({ user: user })
}