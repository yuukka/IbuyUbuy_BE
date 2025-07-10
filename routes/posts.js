var express = require('express')
var router = express.Router()
const postsCtrl = require("../controllers/posts")

router.post("/", postsCtrl.createPost)
router.get("/local", postsCtrl.getPostsForNeighbourhood)

module.exports = router
