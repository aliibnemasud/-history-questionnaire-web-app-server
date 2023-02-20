const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Minimum length must be 3 character"]
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],      
    },
    
    role: {
      type: String,
      default: "user"          
    }
    
})
  
  // SCHEMA ->  MODEL -> QUERY
  
const User = mongoose.model('user', userSchema);

module.exports = User;