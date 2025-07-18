const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/", usersCtrl.createUser)
router.put("/", usersCtrl.updateUser)
router.delete("/", usersCtrl.deleteUser)
router.get("/current", usersCtrl.currentUser)
router.get("/available", usersCtrl.getAvailableUsers)
router.get("/:userId", usersCtrl.getAnyUser)  // note: put this last, it has catch all behavior! 

module.exports = router;
