const express = require('express');
const router = express.Router();
const groupsCtrl = require("../controllers/groups");

router.post("/", groupsCtrl.createGroup)
router.get("/currentUser", groupsCtrl.getGroupsForCurrentUser)
router.get("/nearby", groupsCtrl.getNearbyGroups)
router.put('/join', groupsCtrl.joinGroup)
router.get('/:group_id', groupsCtrl.getGroup)
module.exports = router