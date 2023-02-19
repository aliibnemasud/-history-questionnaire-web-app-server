const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/Users");

router.route("/user")
  /**
   * @api {get} Get all the user
   */
  .get(async (req, res, next) => {
    try {
      const result = await User.find({});
      res.status(200).json({
        status: "Success!",
        message: "Product data Loaded Successfully!",
        data: result,
      });
    } catch (error) {
      res.status(400).send({
        status: "Field!",
        message: "Data inserted Fail",
        error: error.message,
      });
    }
  })

  /**
   * @api {Post} the Products
   */

  .post(async (req, res, next) => {
    try {
      const product = await User.create(req.body);
      res.status(200).json({
        status: "Success!",
        message: "Product data Inserted Successfully!",
        data: product,
      });
    } catch (error) {
      res.status(400).send({
        status: "Field!",
        message: "Data inserted Fail",
        error: error.message,
      });
    }
  });

module.exports = router;