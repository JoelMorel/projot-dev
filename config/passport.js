// Comments

const localStrategy = require("passport-local").Strategy;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User Model
require("../models/User");
const User = mongoose.model("user");

module.exports = function(passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email"
      },
      (email, password, done) => {
        User.findOne({
          email: email
        })
          .then(user => {
            if (!user) {
              return done(null, false, { message: "User not found." });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Incorrect password." });
              }
            });
          })
          .catch();
      }
    )
  );

  // Passport needed for authenticating users
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
