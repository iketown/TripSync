'use strict';
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../models/user.model');
const { JWT_SECRET } = require('../config')



const localStrategy = new LocalStrategy({
  usernameField: 'email' // sign in w email, not username
},
(email, password, done) => {
  let user;
  User.findOne({ email })
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


  const cookieExtractor = function(req){
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt-auth'];
    }
    return token;
  };
  
const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: cookieExtractor,
    // Only allow HS256 tokens - the same as the ones we issue
    algorithms: ['HS256']
  },
  function(payload, done){
    User.findById(payload.sub, function(err,user){
      if(err){
        return done(err,false);
      }
      if (user) {
        return done(null,user)
      } else {
        return done(null,false);
      }
    })
    // const user = await User.findById(payload.sub)
    // done(null, user);
  }
);

module.exports = { localStrategy, jwtStrategy };
