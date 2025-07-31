import express, { response } from "express";
const app = express();
import db from "./db.js"; // 👈 make sure to use .js extension
import person from "./models/person.js";
// const person = require('./models/person.js')
import bodyParser from "body-parser";
// const bodyParser =require('body-parser')
app.use(bodyParser.json());

app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log("Data Saved Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err, "Internal Server Error");
  }

});


  app.get("/person", async (req, res) => {
    try {
      const data = await person.find();
      console.log("Data Fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err, "Internal Server Error");
    }
  });
  
app.get("/", (req, res) => {
  res.send("Hello Welcome to the Homepage");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
