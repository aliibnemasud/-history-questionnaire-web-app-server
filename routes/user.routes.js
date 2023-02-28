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
        message: "User data Loaded Successfully!",
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
      const user = await User.create(req.body);
      res.status(200).json({
        status: "Success!",
        message: "User data Inserted Successfully!",
        data: user,
      });
    } catch (error) {
      res.status(400).send({
        status: "Field!",
        message: "User inserted Fail",
        error: error.message,
      });
    }
  })

  .patch(async (req, res, next) => {
    try {
      
      const validator = req.body.role;
      const user = await User.findOneAndUpdate({_id:req.query.userId }, {role: validator});
      res.status(200).json({
        status: "Success!",
        message: "Validator Updated Successfully!",
        data: user,
      });
    } catch (error) {
      res.status(400).send({
        status: "Field!",
        message: "Validator Updated Fail",
        error: error.message,
      });
    }
  })

  router.route("/user/validator")
  .get(async(req, res, next)=> {

    console.log("calling....")

    try {
      console.log('hello', req.query.email)
      const user = await User.findOne({email: req.query.email });

      if(user.role === 'validator'){
        res.send({validator: true})
      } else {
        res.send({validator:false})
      }
      
    } catch (error) {    
      
    }

  })

module.exports = router;