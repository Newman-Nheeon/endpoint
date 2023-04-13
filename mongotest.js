const mongoose = require('mongoose');
const User = require('./Models/users'); // Assuming you have exported the User model from a separate file

// Connect to MongoDB
mongoose.connect('mongodb+srv://LRI:LRI2023@cluster0.a35w9zg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Create a new user document
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'mysecretpassword'
    });

    // Save the user document to the database
    user.save()
      .then(() => {
        console.log('User saved successfully');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error(err);
        mongoose.connection.close();
      });
  })
  .catch(err => console.error(err));
