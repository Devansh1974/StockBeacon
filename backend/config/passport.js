const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv')


dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id, // Save Google ID
            profilePic: profile.photos[0]?.value, // Save Profile Picture
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
    console.log("✅ Serializing User:", user.id);
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    console.log("📌 Checking session passport:", id);
    try {
      const user = await User.findById(id);
      if (!user) return done(null, false);
      console.log("✅ Deserializing User:", user);
      done(null, user);
    } catch (err) {
      console.log("❌ Error in deserialization:", err);
      done(err, null);
    }
  });
  