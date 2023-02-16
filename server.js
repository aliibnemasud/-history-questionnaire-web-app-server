const app = require("./app");
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8080;
const colors = require("colors");
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(()=> {
  console.log(`History Questionnaire Database connection is successfully`.yellow.bold)
});

app.listen(port, () => {
  console.log(`History Questionnaire Web App Server Running on port ${port}`.red.bold);
});