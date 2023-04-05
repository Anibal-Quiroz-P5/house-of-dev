const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const propertyRouter = require("./property");
const categoryRouter = require("./category");
const adminRouter = require("./admin");
const favouritesRouter = require("./favourites");
const appointmentRouter = require("./appointment");

router.use("/user", userRouter);
router.use("/property", propertyRouter);
router.use("/category", categoryRouter);
router.use("/admin", adminRouter);
router.use("/favourites", favouritesRouter);
router.use("/appointment", appointmentRouter);

module.exports = router;
