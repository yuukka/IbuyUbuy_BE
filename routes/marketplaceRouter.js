var express = require('express');
var router = express.Router();
const marketplaceCtrl = require("../controllers/marketplaceCtrl");
const securityMiddleware = require('../middlewares/security');

// GET item posting listing.

router.get("/marketplace", marketplaceCtrl.index);

// POST Create a new item posting.
// router.post("/post", marketplaceCtrl.add);

// Update comment
// router.put('/update', marketplaceCtrl.update);

//Delete Posting/Comment
// router.delete('/delete', marketplaceCtrl.delete);

module.exports = router;
