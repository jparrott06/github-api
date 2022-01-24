"use strict";

const express = require("express"), 
app = express(), 
router = require("./routes/index"),
cors = require('cors');

app.set("port", process.env.PORT || 5000);

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});