const express = require('express');
const router = express.Router();
const dmsCtrl = require("../controllers/dms");

router.post("/", dmsCtrl.createChat)
router.get("/currentUser", dmsCtrl.getChatsForCurrentUser)
router.put('/addMessage', dmsCtrl.addMessageToChat)

module.exports = router