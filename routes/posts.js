const express = require('express')
const router = express.Router()
const postsCtrl = require("../controllers/posts")

router.post("/", postsCtrl.createPost)
router.put("/", postsCtrl.updatePost)
router.delete("/:id", postsCtrl.deletePost)
router.get("/local", postsCtrl.getPostsForContentFeed)
router.get("/currentUser", postsCtrl.getPostsForCurrentUser)
router.get("/forUser/:userId", postsCtrl.getPostsForAnyUser)
router.get("/:post_id", postsCtrl.getPostForRepost) // last or catch all behavior for get ! 

module.exports = router
