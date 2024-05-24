"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport = require('passport');
exports.passport = passport;
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();
passport.use(new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
}, (_accessToken, _refreshToken, _extraParams, profile, done) => {
    return done(null, profile);
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
