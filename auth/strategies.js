'use strict';
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../models/user.model');
const { JWT_SECRET } = require('../config')



const localStrategy = new LocalStrategy({
  usernameField: 'email' // sign in w email, not username
},
(username, password, done) => {
  let user;
  User.findOne({ email: username })
    .then(userFromPromise => {
      user = userFromPromise;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email or password'
        });
      }
      return done(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false, err);
      }
      return done(err, false);
    });
});


const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    // Look for the JWT as a Bearer auth header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    // Only allow HS256 tokens - the same as the ones we issue
    algorithms: ['HS256']
  },
  (payload, done) => {
    console.log('payload user', payload.user)
    done(null, payload.user);
  }
);

module.exports = { localStrategy, jwtStrategy };
