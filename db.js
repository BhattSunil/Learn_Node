import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


// ✅ Fixed typo in localhost
// const mongoURL = 'mongodb://localhost:27017/hotels';

//connection with Atlas

const mongoURL = process.env.MONGODB_URL

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
export default db;
