const mongoose = require('mongoose');

// ✅ Fixed typo in localhost
// const mongoURL = 'mongodb://localhost:27017/hotels';

//connection with Atlas

const mongoURL = `mongodb+srv://sunilbhatt:qwerty123@cluster0.mhuw15g.mongodb.net/`

// ✅ Fixed "true" spelling and options
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// ✅ Connection success
db.on('connected', () => {
  console.log("Database Connected");
});

// ✅ Connection error
db.on('error', (err) => {
  console.log('Database connection error:', err);
});

// ✅ Disconnected
db.on('disconnected', () => {
  console.log("Database Disconnected");
});

// ✅ Exporting the db object
module.exports = db;
