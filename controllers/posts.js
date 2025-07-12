const Post = require("../models/posts")
const User = require("../models/users")

module.exports = {
  createPost,
  getPostsForNeighbourhood
}

async function getPostsForNeighbourhood(req, res){
    // testing - return all the posts
    const posts = await Post.find().sort('-createdAt')
    res.json({ posts: posts })    
}

// ok creating posts, want to take current user and copy in neigbourhood (maybe other things)
async function createPost(req, res) {
    const userId = req.auth.userId
    const currentUser = await User.findOne({ user_id: userId }) // get user to get neighbourhood
    const postData = { ...req.body } // want to copy req.body
    postData.user_id = userId 
    postData.neighbourhood = currentUser.neighbourhood // maybe something more general for visibility here
    postData.user = {}
    postData.user.fullName = currentUser.fullName
    postData.user.profileImg = currentUser.profileImg
    postData.user.neighbourhood = currentUser.neighbourhood

    // should add user ful Namne/neighbohour/profile img too
    const post = await Post.create(postData)
    res.json({ post: post })    
}

// e.g. for the user profile page ? view own posts
// async function getPostsForCurrentUser(req, res){
//     const userId = req.auth.userId
//     const posts = await Post.find({ user_id: userId })
//     res.json({ posts: posts })
// }

