const Post = require("../models/posts")
const User = require("../models/users")

module.exports = {
  createPost,
  updatePost,
  getPostsForContentFeed,
  getPostsForCurrentUser,
  getPostsForAnyUser,
  deletePost
}

async function getPostsForContentFeed(req, res){
    // testing - return all the posts
    const posts = await Post.find().sort('-createdAt')
    res.json({ posts: posts })    
}

async function createPost(req, res) {
    const userId = req.auth.userId
    const currentUser = await User.findOne({ user_id: userId })
    const postData = { ...req.body }

    // building the postData with current user info, basically duplciating but makes easier in FE 
    postData.user_id = userId 
    postData.neighbourhood = currentUser.neighbourhood     
    postData.user = {}
    postData.user.fullName = currentUser.fullName
    postData.user.profileImg = currentUser.profileImg
    postData.user.neighbourhood = currentUser.neighbourhood

    const post = await Post.create(postData)
    res.json({ post: post })    
}

async function updatePost(req, res) {
  const userId = req.auth.userId
  const postData = {... req.body}
  const post = await Post.findById(postData._id)
  const postUpdated = await Post.findByIdAndUpdate(post._id, postData, { new: true })
  res.json({ post: postUpdated })

  // todo - security problem
  // this approach below ONLY lets you comment on your own posts. NOT GOOD
  // need a way to restrict updating the post content (edit post) to currentUser only, but ALSO let anyone add comment
  // if (post.user_id === userId){ // security: only update post if belongs to current user
  //   const postUpdated = await Post.findByIdAndUpdate(post._id, postData, { new: true })
  //   res.json({ post: postUpdated })
  // } else {
  //   return res.status(403).json({ error: 'cannot' })
  // }
}

// e.g. for the user profile page ? view own posts
async function getPostsForCurrentUser(req, res){
    const userId = req.auth.userId
    const posts = await Post.find({ user_id: userId }).sort('-createdAt')
    res.json({ posts: posts })
}

async function getPostsForAnyUser(req, res){
    const userId = req.params.userId
    const posts = await Post.find({ user_id: userId }).sort('-createdAt')
    res.json({ posts: posts })
}

async function deletePost(req, res){
  const userId = req.auth.userId
  const postId = req.params.id
  const post = await Post.findById(postId)
  if (post.user_id === userId){ // security: only delete post if belongs to current user
    const deleted = await Post.findByIdAndDelete(postId)
    res.json({ 'deleted': deleted })
  } else {
    return res.status(403).json({ error: 'cannot' })
  } 
}



