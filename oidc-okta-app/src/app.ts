import express, { Request, Response } from "express";
import session from "express-session";
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
import path from "path";
import config from "config";

// Create Express server
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sClientId = config.get<string>("session.clientId");

app.use(session({
    secret: sClientId,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  }));

const port = process.env.PORT ? process.env.PORT : config.get("port");
const clientId = config.get("okta.clientId");
const clientSecret = config.get("okta.clientSecret");

// set up passport
/*
passport.use('oidc', new OpenIDStrategy({
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  authorizationURL: 'https://{yourOktaDomain}/oauth2/default/v1/authorize',
  tokenURL: 'https://{yourOktaDomain}/oauth2/default/v1/token',
  userInfoURL: 'https://{yourOktaDomain}/oauth2/default/v1/userinfo',
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: 'http://localhost:' + port + '/authorization-code/callback',
  scope: 'openid profile'
}, (issuer, sub, profile, accessToken, refreshToken, done) => {
  return done(null, profile);
}));*/

// @TODO add auth middleware
// @TODO add registration page
// @TODO add logout route

app.use('/', require('./routes/index'));

/*
app.get("/hello", (req: Request, resp: Response) => {
  console.group("Request /hello");
  console.log("request host: ", req.hostname);
  console.log(JSON.stringify(req.headers));
  console.groupEnd();
  resp.send("Hello from basket");
});*/


export default app;