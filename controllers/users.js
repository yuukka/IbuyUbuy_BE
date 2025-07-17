const User = require("../models/users")

module.exports = {
  createUser,
  currentUser,
  getAnyUser,
  updateUser,
  deleteUser
}

async function currentUser(req, res){
  const userId = req.auth.userId
  const user = await User.findOne({ user_id: userId })
  res.json({ user: user })
}

async function getAnyUser(req, res){
  const userId = req.params.userId
  const user = await User.findOne({ user_id: userId })
  res.json({ user: user })
}

async function createUser(req, res){
  const userData = { ...req.body, user_id: req.auth.userId } // merge in user_id from Clerk before the save
  const user = await User.create(userData)
  res.json({ user: user })
}

async function updateUser(req, res){
  const userData = { ...req.body, user_id: req.auth.userId } // merge in user_id from Clerk before the save
  
  // confusing - cant use findById because that's the mongo id, we need to find by clerk id for security reasons
  const user = await User.findOneAndUpdate(
    { user_id: req.auth.userId },
    userData,
    { new: true }
  )
  res.json({ user: user })
}

async function deleteUser(req, res){
  // todo - what about Clerk account??
}