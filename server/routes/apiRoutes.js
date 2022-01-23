const router = require("express").Router(),
apiController = require("../controllers/apiController");


// Route to get all open pull requests give repo
router.get("/getOpenPRs", apiController.getOpenPRs, apiController.getCommitNum, apiController.respondJSON);


module.exports = router;