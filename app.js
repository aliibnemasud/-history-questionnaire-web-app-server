const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");


app.use(cors());
app.use(express.json());


// User routes
app.use('/', userRoutes)

app.use('/', questionRoutes)


app.get("/", (req, res) => {
  res.send("History Questionnaire Web App Server is Running.....");
});

app.all("*", (req, res) => {
  res.send("No Routes found!");
});

module.exports = app;