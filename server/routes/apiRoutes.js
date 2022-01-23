const router = require("express").Router(),
apiController = require("../controllers/apiController");


// Route to get all open pull requests give repo
router.get("/getOpenPRs", apiController.getOpenPRs);


module.exports = router;