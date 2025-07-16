const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/", usersCtrl.createUser)
router.put("/", usersCtrl.updateUser)
router.delete("/", usersCtrl.deleteUser)
router.get("/current", usersCtrl.currentUser)
router.get("/:userId", usersCtrl.getAnyUser) 

module.exports = router;
