const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({

    questionAnswer: {
      type: Array 
    }    
})
  
  // SCHEMA ->  MODEL -> QUERY
  
const Question = mongoose.model('question', questionSchema);

module.exports = Question;