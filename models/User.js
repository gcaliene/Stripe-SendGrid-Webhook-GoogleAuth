const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//also can bew written const  { Schema } = mongoose; es6 destructuring

const userSchema = new Schema({
  googleId: String, //make sure that everywhere has googleId
  credits: { type: Number, default: 0 }
});

// now to create an actuall class and that this collection needs to be created, we are going to add the next line:
mongoose.model('users', userSchema); //this creates our first model class
