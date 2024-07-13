const express = require("express");
const router = express.Router({ mergeParams: true }); // kai norim grazinti reviews per hotel route

const serviceController = require("../controllers/serviceController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router
  .route("/")
  .get(serviceController.getAllServices)
  .post(serviceController.createService);

module.exports = router;
