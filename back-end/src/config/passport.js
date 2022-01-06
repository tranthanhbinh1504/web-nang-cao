const passport = require('passport');
var User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// load  user model


// used to serialize the user for the session
passport.serializeUser( function(user, done) {
    done(null, user.id);
    
})
 // used to deserialize the user
passport.deserializeUser( function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    })
})



passport.use( new GoogleStrategy({
    clientID:     '747749520089-9uiv8cd656l7ts1lpd2s4tm0t2pdairb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/api/login/auth/google/callback",
    passReqToCallback   : true
  },
function(request, accessToken, refreshToken, profile, done) {

    User.findOne({
            'userName': profile.emails[0].value, 
        }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            // let regexEmail = "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(student.tdtu.edu)\.vn$";
            let regexEmail = "^[a-z0-9](\.?[a-z0-9]){5,}@?(student.tdtu.edu)\.vn$";

            let email = profile.emails[0].value;
            if (email.match(regexEmail)) {
                console.log(1)
                user = new User({
                    name: profile.displayName,
                    userName: profile.emails[0].value,
                    role: 'Student',
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });

            } else {
                return done(null,false)
            }
            
        } else {
            //found user. Return
            return done(err, user);
        }
    });
}
));