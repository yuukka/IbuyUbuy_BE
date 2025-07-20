var express = require('express');
var router = express.Router();
const eventsCtrl = require("../controllers/events");
const securityMiddleware = require('../middlewares/security');

/* GET Events listing. */
router.get("/", eventsCtrl.index);

router.post("/create", eventsCtrl.add);

// router.post('/update', eventsCtrl.update);

// router.post('/favarite', eventsCtrl.favarite);

// router.post('/delete', eventsCtrl.delete);

module.exports = router;
