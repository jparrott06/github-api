const router = require("express").Router(),
errorController = require("../controllers/errorController")


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);
router.use(errorController.errorJSON);

module.exports = router;