import { NextApiResponse, NextApiRequest } from "next";
import httpProxy, { ServerOptions } from "http-proxy";

export interface NextHttpProxyMiddlewareOptions extends ServerOptions {
  pathRewrite?: { [key: string]: string };
  /** @type {(proxyReq: any, req: any) => boolean} Override proxyReq event handler. If return true, bypass the original event handler. */
  proxyReqOverride?: (proxyReq: any, req: any) => boolean;
}

/**
 * @see https://www.npmjs.com/package/http-proxy
 */
const proxy: httpProxy = httpProxy.createProxy();

/**
 * If a key pattern is found in `pathRewrite` that matches the url value,
 * replace matched string of url with the `pathRewrite` value.
 * @param req
 * @param pathRewrite
 */
export const rewritePath = (
  url: string,
  pathRewrite: { [key: string]: string }
) => {
  for (let patternStr in pathRewrite) {
    const pattern = RegExp(patternStr);
    const path = pathRewrite[patternStr];
    if (pattern.test(url as string)) {
      return url.replace(pattern, path);
    }
  }
  return url;
};

/**
 * Next.js HTTP Proxy Middleware
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @param {NextHttpProxyMiddlewareOptions} httpProxyOptions
 */
const httpProxyMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  httpProxyOptions: NextHttpProxyMiddlewareOptions = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    const { pathRewrite, proxyReqOverride } = httpProxyOptions;
    if (pathRewrite) {
      req.url = rewritePath(req.url as string, pathRewrite);
    }
    /**
     * Please refer to the following links for the specification document for HTTP.
     * @see https://tools.ietf.org/html/rfc7231
     * @see https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
     */
    const hasRequestBodyMethods: string[] = ["HEAD",  "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "PATCH"];
    if (hasRequestBodyMethods.indexOf(req.method as string) >= 0 && typeof req.body === "object") {
      req.body = JSON.stringify(req.body);
    }
    proxy
      .once("proxyReq", ((proxyReq: any, req: any): void => {
        if (proxyReqOverride && proxyReqOverride(proxyReq, req)) return;
        if (hasRequestBodyMethods.indexOf(req.method as string) >= 0 && typeof req.body === "string") {
          proxyReq.write(req.body);
          proxyReq.end();
        }
      }) as any)
      .once("proxyRes", resolve as any)
      .once("error", reject)
      .web(req, res, {
        changeOrigin: true,
        ...httpProxyOptions
      });
  });

export default httpProxyMiddleware;
