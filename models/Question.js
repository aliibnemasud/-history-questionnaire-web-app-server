const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({

    questionAnswer: {
      type: Array 
    },    
    email: {
      type: String,
      required: true
    },   
    status: {
      type: String,
      default: "in progress"
    }
})
  
  // SCHEMA ->  MODEL -> QUERY
  
const Question = mongoose.model('question', questionSchema);

module.exports = Question;