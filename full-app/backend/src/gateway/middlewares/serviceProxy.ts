import proxy from "http-proxy-middleware";

export function createServiceProxies(): Array<proxy.Proxy> {
  console.log("Looking for configured services ...");
  return [];
}
