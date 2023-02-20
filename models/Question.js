const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({

    questionAnswer: {
      type: Array 
    },    
    email: {
      type: String,
      required: true
    }   
})
  
  // SCHEMA ->  MODEL -> QUERY
  
const Question = mongoose.model('question', questionSchema);

module.exports = Question;