var express = require('express');
var router = express.Router();
const marketplaceCtrl = require("../controllers/marketplaceCtrl");


router.get("/", marketplaceCtrl.allList); // GET item posting listing.

router.get("/user", marketplaceCtrl.yourList);  //GET user listing

router.get("/favourites", marketplaceCtrl.favList);  //GET saved listin

router.get('/:id', marketplaceCtrl.viewListing) 

// POST Create a new item posting.
router.post("/new", marketplaceCtrl.createListing);

// PUT Update item posting
router.put('/:id', marketplaceCtrl.updateListing);

//Delete Delete item posting
router.delete('/:id', marketplaceCtrl.deleteListing);

module.exports = router;
