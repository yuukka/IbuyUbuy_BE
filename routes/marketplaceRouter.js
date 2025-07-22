var express = require('express');
var router = express.Router();
const marketplaceCtrl = require("../controllers/marketplaceCtrl");

// GET item posting listing.

router.get("/alllist", marketplaceCtrl.allList);

router.get("/yourlist", marketplaceCtrl.yourList);

router.get("/savedlist", marketplaceCtrl.savedList);

// POST Create a new item posting.
// router.post("/post", marketplaceCtrl.add);

// Update comment
// router.put('/update', marketplaceCtrl.update);

//Delete Posting/Comment
// router.delete('/delete', marketplaceCtrl.delete);

module.exports = router;
