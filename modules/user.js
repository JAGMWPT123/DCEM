var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    //   required: true,
    //   unique: true,
    },
    password:{
        type: String
    },
   // ambitions : String,
    //education : String
  });
  userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("user", userSchema);