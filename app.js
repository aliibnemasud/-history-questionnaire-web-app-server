const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");
var jwt = require("jsonwebtoken");

function verifyJwt(req, res, next) {
  //console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  // verify a token symmetric
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if(err){
      return res.status(403).status({ message: "Forbidden access" })
    }
    req.decoded = decoded;    
    // console.log("insideDecoded", decoded)
  });
  
  next();
}

app.use(cors());
app.use(express.json());

// User routes
app.use("/", userRoutes);

app.use("/", questionRoutes);

app.post("/login", async (req, res) => {
  // console.log(req.decoded)
  const user = req.body;
  const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
  res.send({ accessToken });
});

app.get("/", (req, res) => {
  res.send("History Questionnaire Web App Server is Running.....");
});

app.all("*", (req, res) => {
  res.send("No Routes found!");
});

module.exports = app;
