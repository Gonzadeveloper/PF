const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();


passport.use(new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
}, (accessToken:any, refreshToken:any, _extraParams:any, profile:any, done:any) => {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  return done(null, profile);
}));

passport.serializeUser((user:any, done:any) => {
  done(null, user);
});

passport.deserializeUser((user:any, done:any) => {
  done(null, user);
});

export  {passport};