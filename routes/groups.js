const express = require('express');
const router = express.Router();
const groupsCtrl = require("../controllers/groups");

router.post("/", groupsCtrl.createGroup)
router.get("/currentUser", groupsCtrl.getGroupsForCurrentUser)
router.get("/nearby", groupsCtrl.getNearbyGroups)
module.exports = router