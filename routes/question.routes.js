const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require("../models/Question");

router
  .route("/questions")
  /**
   * @api {get} Get all the user
   */
  .get(async (req, res, next) => {
    try {
      const questions = await Question.find({});
      res.status(200).json({
        status: "Success!",
        message: "Question Successfully Loaded!",
        data: questions,
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
   * @api {Post} the question
   */

  .post(async (req, res, next) => {
    try {
      const question = await Question.create(req.body);
      res.status(200).json({
        status: "Success!",
        message: "Question data Inserted Successfully!",
        data: question,
      });
    } catch (error) {
      res.status(400).send({
        status: "Field!",
        message: "Data inserted Fail",
        error: error.message,
      });
    }

  });

  router
  .route("/questions/:id").get(async (req, res, next) => {
    try {      
      const questions = await Question.find({_id: req.params.id});
      res.status(200).json({
        status: "Success!",
        message: "Question Successfully Loaded!",
        data: questions,
      });
    } catch (error) {
      res.status(400).send({
        status: "Field!",
        message: "Data Not Found",
        error: error.message,
      });
    }
  })

module.exports = router;
