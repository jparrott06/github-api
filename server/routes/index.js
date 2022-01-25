const router = require("express").Router(),
apiRoutes = require("./apiRoutes"),
errorRoutes = require('./errorRoutes');

router.use("/api", apiRoutes);

router.use("/", errorRoutes);

module.exports = router;