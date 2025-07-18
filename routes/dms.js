const express = require('express');
const router = express.Router();
const dmsCtrl = require("../controllers/dms");

router.post("/", dmsCtrl.createChat)

module.exports = router