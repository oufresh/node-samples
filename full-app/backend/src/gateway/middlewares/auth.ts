import config from "config";
import httpProxy from "http-proxy-middleware";
import { IncomingMessage, ServerResponse, ClientRequest } from "http";

export const auth = httpProxy({
  target:
    config.get("authentication.server.protocol") +
    "://" +
    config.get("authentication.server.host") +
    ":" +
    config.get("authentication.server.port"),
  changeOrigin: true,
  //pathRewrite: { "^/users/authenticate": "/users/authenticate" },
  onError: (err: Error, req: IncomingMessage, res: ServerResponse) => {
    console.error(err);
    console.error(req);
    res.writeHead(500, {
      "Content-Type": "text/plain"
    });
    res.end(
      "Something went wrong with auth server. And we are reporting a custom error message."
    );
  },
  onProxyReq: (proxyReq: ClientRequest /*, req: Request, res: Response*/) => {
    const debug = config.get("debug");
    if (debug === true) {
      console.log(proxyReq.getHeaders());
      console.log(proxyReq.path);
    }
  }
});
