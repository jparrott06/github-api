const router = require("express").Router(),
apiController = require("../controllers/apiController"),
errorController = require("../controllers/errorController");


// Route to get all open pull requests give repo
router.get("/getOpenPRs", apiController.getOpenPRs, apiController.getCommitNum, apiController.respondJSON);

// Use errorController as middleware - catch all errors and return in JSON format
router.use(errorController.errorJSON);

module.exports = router;