const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importing files and modules
const { logger } = require('./middlewares/logger');

// Define your list of allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', '*'];

// Configure CORS with dynamic origin validation
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(logger);

// Retrieve environment variables
const { MONGO_URI, PORT } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URI);

console.log('Connecting to MongoDB...');
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
})
mongoose.connection.on('error', err => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})