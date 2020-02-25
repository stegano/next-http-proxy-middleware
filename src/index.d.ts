import { ServerOptions } from "http-proxy";
export interface NextHttpProxyMiddlewareOptions extends ServerOptions {
  pathRewrite?: { [key: string]: string };
}
