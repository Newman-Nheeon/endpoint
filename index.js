const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/registerRouter');
const authRouter = require('./routes/authRouter');
const app = express();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://LRI:LRI2023@cluster0.a35w9zg.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// routes
app.use('/register', registerRouter);
app.use('/login', authRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
