var express = require('express');
var router = express.Router();
const marketplaceCtrl = require("../controllers/marketplaceCtrl");

// GET item posting listing.

router.get("/alllist", marketplaceCtrl.allList);

router.get("/yourlist", marketplaceCtrl.yourList);

router.get("/savedlist", marketplaceCtrl.savedList);

// POST Create a new item posting.
router.post("/", marketplaceCtrl.createListing);

// Update comment
// router.put('/update', marketplaceCtrl.update);

//Delete Posting/Comment
// router.delete('/delete', marketplaceCtrl.delete);

router.get('/:id', marketplaceCtrl.viewListing)  // user getting full page of some listing

module.exports = router;
