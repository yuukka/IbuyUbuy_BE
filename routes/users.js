var express = require('express');
var router = express.Router();
const usersCtrl = require("../controllers/users");
const securityMiddleware = require('../middlewares/security');

/* GET users listing. */

router.get("/", usersCtrl.index);

// router.post("/create", usersCtrl.add);

// router.post('/login', usersCtrl.loginUser);

module.exports = router;
