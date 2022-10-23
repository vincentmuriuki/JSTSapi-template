import dotenv = require('dotenv');

dotenv.config();
const config = {
  PORT: process.env.PORT || 3010,
  secret: process.env.SECRET,
  database: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DB_PORT,
    hostCloudSql: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    prodUrl: process.env.DATABASE_URL,
  },
  slackConfig: {
    channel: process.env.SLACK_CHANNEL,
    slackToken: process.env.SLACK_TOKEN,
  },
  googleConfig: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/api/v1/auth/google/callback`,
  },
  mpesaConfig: {
    callbackUrl: `${process.env.BACKEND_URL}/api/v1/mpesa/callback`,
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    environment: process.env.MPESA_ENVIRONMENT,
    shortCode: process.env.MPESA_SHORT_CODE,
    initiatorName: process.env.MPESA_INITIATOR_NAME,
    lipaNaMpesaShortCode: process.env.MPESA_LIPA_NA_MPESA_SHORT_CODE,
    lipaNaMpesaShortPass: process.env.MPESA_LIPA_NA_MPESA_SHORT_PASS,
    securityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
  },
  facebookConfig: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name'],
  },
  s3Config: {
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  },
  HASH_SALT_ROUNDS: 10,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  debug: false,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  twilioConfig: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONENUMBER: process.env.TWILIO_PHONENUMBER,
  },
  safaricomConfig: {
    MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
    MPESA_ENVIRONMENT: process.env.MPESA_ENVIRONMENT,
    MPESA_SECURITY_CREDENTIAL: process.env.MPESA_SECURITY_CREDENTIAL,
    LNM_PASSKEY: process.env.LNM_PASSKEY,
    LNM_SHORTCODE: process.env.LNM_SHORTCODE,
  },
  env: process.env.NODE_ENV || 'development',
  limiter: {
    maxRequests: process.env.MAX_REQUESTS,
    windowsMs: process.env.WINDOWS_MS,
  },
  jwtExpiresIn: '72h',
  jwtRefreshExpiresIn: 43200,
  cookies: {
    secret: process.env.SECRET,
    sameSite: process.env.SAME_SITE,
    cookieSecure: process.env.NODE_ENV !== 'development',
  },
  cloudinary: {
    appName: process.env.CLOUDINARY_APP_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    envVariable: process.env.CLOUDINARY_ENV_VARIABLE,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
};

export default config;
