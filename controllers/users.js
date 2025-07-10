const User = require("../models/users")

module.exports = {
  getUser,
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

async function getUser(req, res) {
  //const userId = req.auth.userId // or should do it by Clerk Id?
  const userId = req.body.user_id // able to get other users/neighbors/whoever
  const user = await User.findById( userId) // finding by mongo id not clerk
  res.json({ user: user })
}
