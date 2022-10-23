import config from '.';

const FacebookStrategy = require('passport-facebook');
const GoogleAuth = require('passport-google-oauth20');

const passport = require('passport');

const { facebookConfig, googleConfig } = config.default;

const strategyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any
) => {
  process.nextTick(() => done(null, profile));
};

passport.use(new GoogleAuth(googleConfig, strategyCallback));

passport.use(new FacebookStrategy(facebookConfig, strategyCallback));

export default passport;
