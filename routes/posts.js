const express = require('express')
const router = express.Router()
const postsCtrl = require("../controllers/posts")

router.post("/", postsCtrl.createPost)
router.post("/forGroup/:goup_id", postsCtrl.createPostForGroup)
router.put("/", postsCtrl.updatePost)
router.delete("/:id", postsCtrl.deletePost)
router.get("/local", postsCtrl.getPostsForNeighbourhood)
router.get("/currentUser", postsCtrl.getPostsForCurrentUser)
router.get("/forUser/:userId", postsCtrl.getPostsForAnyUser)
router.get("/:post_id", postsCtrl.getPostForRepost) // last or catch all behavior for get ! 

module.exports = router
