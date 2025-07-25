const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// Importing middleware
const { logger, logEvents } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler')

// Importing configs
const corsOptions = require('./config/corsOptions');
const dbConnect = require('./config/dbConnect');
const helmetConfig = require('./config/helmetConfig');

// Load environment variables
dotenv.config();

// Connect to MongoDB
dbConnect();

// Create express app
const app = express();

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmetConfig());
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/auth', require('./routes/authRoute'))
app.use('/users', require('./routes/userRoute'))
app.use('/tutors', require('./routes/tutorRoute'))
app.use('/company', require('./routes/companyRoute'))
app.use('/courses', require('./routes/courseRoute'))
app.use('/content', require('./routes/contentRoute'))

// Error handler middleware
app.use(errorHandler);

// Retrieve environment variables
const { PORT } = process.env;

console.log('Connecting to MongoDB...');
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  })
})
mongoose.connection.on('error', err => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})