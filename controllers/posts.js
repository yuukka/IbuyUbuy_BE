const Post = require("../models/posts")
const Group = require("../models/groups")
const User = require("../models/users")

module.exports = {
  createPost,
  createPostForGroup,
  updatePost,
  getPostsForNeighbourhood,
  getPostsForCurrentUser,
  getPostForRepost,
  getPostsForAnyUser,
  deletePost
}

async function getPostsForNeighbourhood(req, res){
    const posts = await Post.find().sort('-createdAt')

    // filter out the group posts (they belong in groups not dashboard)
    // can replace this with mongoose query potentially
    const postsNonGroup = posts.filter(post => !post.for_group)

    res.json({ posts: postsNonGroup })    
}

async function getPostForRepost(req, res){
  // scope to neighbourhood eventually (here anyone can get any post)
  const postId = req.params.post_id
  const post = await Post.findById(postId)
  res.json({ post: post })  
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

async function createPostForGroup(req, res) {
    // look for req.body.group_id and req.body.post
    // basically copying / duplicating a lot of createPost

    const userId = req.auth.userId
    const currentUser = await User.findOne({ user_id: userId })
    const postData = { ...req.body.post }

    // building the postData with current user info, basically duplciating but makes easier in FE 
    postData.user_id = userId 
    postData.neighbourhood = currentUser.neighbourhood     
    postData.user = {}
    postData.user.fullName = currentUser.fullName
    postData.user.profileImg = currentUser.profileImg
    postData.user.neighbourhood = currentUser.neighbourhood

    const post = await Post.create(postData)

    const group = await Group.findById(req.body.group_id)
    group.post_ids.push(post._id)
    await group.save()
    console.log('adding post id to group', group.post_ids)

    res.json({ post: post }) 
}

async function AddCommentToPost(req, res){
  // this is inherently safe, doesnt need to be locked
  // part of a needed refactor to avoid below  mess
}

async function updatePost(req, res) {
  const userId = req.auth.userId
  const postData = {... req.body}
  const post = await Post.findById(postData._id)
  const postUpdated = await Post.findByIdAndUpdate(post._id, postData, { new: true })
  res.json({ post: postUpdated })

  // adding a comment to a post = safe..... any user can do that, no problem
  // BUT not anyone can edit text content of POST (only original author can)

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



