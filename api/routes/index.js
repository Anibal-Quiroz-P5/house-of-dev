const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const propertyRouter = require("./property");
const categoryRouter = require("./category");
const favouritesRouter = require("./favourites");

router.use("/user", userRouter);
router.use("/property", propertyRouter);
router.use("/category", categoryRouter);
router.use("/favourites", favouritesRouter);

module.exports = router;
