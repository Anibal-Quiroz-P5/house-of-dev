const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const propertyRouter = require("./property");

router.use("/user", userRouter);
router.use("/property", propertyRouter);

module.exports = router;
