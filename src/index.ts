import { NextApiResponse, NextApiRequest } from "next";
import httpProxy, { ServerOptions } from "http-proxy";
export interface NextHttpProxyMiddlewareOptions extends ServerOptions {
  pathRewrite?: { [key: string]: string } 
  | { patternStr: string, replaceStr: string }[];
  onProxyInit?: (httpProxy: httpProxy) => void
}

/**
 * Please refer to the following links for the specification document for HTTP.
 * @see https://tools.ietf.org/html/rfc7231
 * @see https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
 */
  const hasRequestBodyMethods: string[] = ["HEAD",  "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "PATCH"];

/**
 * If pattern information matching the input url information is found in the `pathRewrite` array, 
 * the url value is partially replaced with the `pathRewrite.replaceStr` value.
 * @param url
 * @param pathRewrite
 */
export const rewritePath = (
  url: string,
  pathRewrite: NextHttpProxyMiddlewareOptions['pathRewrite']
) => {
  if(Array.isArray(pathRewrite)){
    for (const item of pathRewrite) {
      const {
        patternStr,
        replaceStr
      } = item;
      const pattern = RegExp(patternStr);
      if (pattern.test(url as string)) {
        return url.replace(pattern, replaceStr);
      }
    }
  } else {
    console.warn('[next-http-proxy-middleware] Use array instead of object for \`pathRewrite\` value '
    + '(related issue: https://github.com/stegano/next-http-proxy-middleware/issues/39)');
    for (const patternStr in pathRewrite) {
      const pattern = RegExp(patternStr);
      const path = pathRewrite[patternStr];
      if (pattern.test(url as string)) {
        return url.replace(pattern, path);
      }
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
  httpProxyOptions: NextHttpProxyMiddlewareOptions = {},
): Promise<any> =>
  new Promise((resolve, reject) => {
    const { pathRewrite, onProxyInit, ...serverOptions } = httpProxyOptions;

    /**
     * @see https://www.npmjs.com/package/http-proxy
     */
    const proxy: httpProxy = httpProxy.createProxy();

    if(typeof onProxyInit === 'function') {
      onProxyInit(proxy);
    }

    if (pathRewrite) {
      req.url = rewritePath(req.url as string, pathRewrite);
    }

    if (hasRequestBodyMethods.indexOf(req.method as string) >= 0 && typeof req.body === "object") {
      req.body = JSON.stringify(req.body);
    }
    proxy
      .once("proxyReq", ((proxyReq: any, req: any): void => {
        if (hasRequestBodyMethods.indexOf(req.method as string) >= 0 && typeof req.body === "string") {
          proxyReq.write(req.body);
          proxyReq.end();
        }
      }) as any)
      .once("proxyRes", resolve as any)
      .once("error", reject)
      .web(req, res, {
        changeOrigin: true,
        ...serverOptions
      });
  });

export default httpProxyMiddleware;
