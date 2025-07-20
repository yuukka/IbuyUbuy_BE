var express = require('express');
var router = express.Router();
const eventsCtrl = require("../controllers/events");
const securityMiddleware = require('../middlewares/security');

/* GET Events listing. */
router.get("/", eventsCtrl.index);

router.post("/create", eventsCtrl.add);

router.post('/update', eventsCtrl.updatePat);

router.post('/remove', eventsCtrl.removePat);

// router.post('/favarite', eventsCtrl.favarite);

router.delete('/delete', eventsCtrl.toDelete);

module.exports = router;
