import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import db from "./db.js";
import person from "./models/person.js";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} request made to ${req.originalUrl}`);
  next();
};
app.use(logRequest);

// Passport Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    console.log("Received Credentials:", username, password);
    const user = await person.findOne({ username });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    const isPasswordMatch = user.password === password;
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password." });
    }
  } catch (err) {
    return done(err);
  }
}));

// Routes

// Register person
app.post("/person", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();

    console.log("Data Saved Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all persons
app.get("/person", async (req, res) => {
  try {
    const data = await person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route (authentication happens here)
app.post("/login", passport.authenticate('local', { session: false }), (req, res) => {
  res.send("Login Successful!");
});

// Protected route (optional - just for testing)
app.get("/signup", passport.authenticate('local', { session: false }), (req, res) => {
  res.send("Signup");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
