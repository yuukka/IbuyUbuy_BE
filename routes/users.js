var express = require('express');
var router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/", usersCtrl.createUser)
router.put("/", usersCtrl.updateUser)
router.get("/current", usersCtrl.currentUser) 

module.exports = router;
