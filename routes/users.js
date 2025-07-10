var express = require('express');
var router = express.Router();
const usersCtrl = require("../controllers/users");

router.get("/", usersCtrl.getUser)
router.post("/", usersCtrl.createUser)

router.get("/current", usersCtrl.currentUser) 

module.exports = router;
