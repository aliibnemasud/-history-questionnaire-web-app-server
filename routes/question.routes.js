const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/Question");
var jwt = require("jsonwebtoken");

function verifyJwt(req, res, next) {  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  // verify a token symmetric
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).status({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    //console.log("insideDecoded", decoded);
  });

  next();
}

router.route("/questions")
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

  // get specific question

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

router.route("/myQuestions").get(verifyJwt, async (req, res, next) => {
  try {
    const decodedEmail = req.decoded.email;
    if (decodedEmail === req.query.email) {
      const questions = await Question.find({ email: req.query.email });
      res.status(200).json({
        status: "Success!",
        message: "Question Successfully Loaded!",
        data: questions,
      });
    }
  } catch (error) {
    res.status(400).send({
      status: "Field!",
      message: "Data inserted Fail",
      error: error.message,
    });
  }
});

router.route("/questions/:id")
.get(async (req, res, next) => {
  try {
    const questions = await Question.find({ _id: req.params.id });
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
.patch(async (req, res, next) => {
  try {
    // console.log(req.params)
    const questions = await Question.updateOne({ _id: req.params.id }, {status: 'approved' });
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
