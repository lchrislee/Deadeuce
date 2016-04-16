var mongoose = require('mongoose');

// this creates the schema 
var userSchema = new mongoose.Schema ({

  name: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: Boolean,
  location: String
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});


// this is the a method to add -dude to the end of user's name
userSchema.methods.dudify = function(){
  this.name = this.name + '-dude';

  return this.name;
};

// this creates the model using the schema userSchema
var User = mongoose.model('User', userSchema);


// michael. you better know what this does...
// but if you don't
// this lets it get called by other files
module.exports = User;