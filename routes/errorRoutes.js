const router = require('express').Router(),
	errorController = require('../controllers/errorController');

router.use(errorController.logErrors);
router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);

module.exports = router;