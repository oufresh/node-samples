//import errorHandler from "errorhandler";
import config from "config";
//import logger from "./logger";
import Provider from "oidc-provider";
import path from "path";

import set from "lodash/set";
import render from "koa-ejs";
import helmet from "koa-helmet";

import Account from "./support/account";
import configuration from "./support/configuration";
import routes from "./routes/koa";

const PORT = process.env.PORT ? process.env.PORT : config.get("port");
const ISSUER = `http://localhost:${PORT}`;
configuration.findAccount = Account.findAccount;

let server = null;

(async () => {
  let adapter;
  if (process.env.MONGODB_URI) {
    adapter = require('./adapters/mongodb'); // eslint-disable-line global-require
    await adapter.connect();
  }

  const provider = new Provider(ISSUER, { adapter, ...configuration });

  provider.use(helmet());

  if (process.env.NODE_ENV === 'production') {
    provider.proxy = true;
    set(configuration, 'cookies.short.secure', true);
    set(configuration, 'cookies.long.secure', true);

    provider.use(async (ctx, next) => {
      if (ctx.secure) {
        await next();
      } else if (ctx.method === 'GET' || ctx.method === 'HEAD') {
        ctx.redirect(ctx.href.replace(/^http:\/\//i, 'https://'));
      } else {
        ctx.body = {
          error: 'invalid_request',
          error_description: 'do yourself a favor and only use https',
        };
        ctx.status = 400;
      }
    });
  }
  render(provider.app, {
    cache: false,
    viewExt: 'ejs',
    layout: '_layout',
    root: path.join(__dirname, 'views'),
  });
  provider.use(routes(provider).routes());
  server = provider.listen(PORT, () => {
    console.log(`application is listening on port ${PORT}, check its /.well-known/openid-configuration`);
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});
