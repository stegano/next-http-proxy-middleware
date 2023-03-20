import { NextApiResponse, NextApiRequest } from "next";
import httpProxy, { ServerOptions } from "http-proxy";
export interface NextHttpProxyMiddlewareOptions extends ServerOptions {
    pathRewrite?: {
        [key: string]: string;
    } | {
        patternStr: string;
        replaceStr: string;
    }[];
    onProxyInit?: (httpProxy: httpProxy) => void;
}
/**
 * If pattern information matching the input url information is found in the `pathRewrite` array,
 * the url value is partially replaced with the `pathRewrite.replaceStr` value.
 * @param url
 * @param pathRewrite
 */
export declare const rewritePath: (url: string, pathRewrite: {
    [key: string]: string;
} | {
    patternStr: string;
    replaceStr: string;
}[] | undefined) => string;
/**
 * Next.js HTTP Proxy Middleware
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @param {NextHttpProxyMiddlewareOptions} httpProxyOptions
 */
declare const httpProxyMiddleware: (req: NextApiRequest, res: NextApiResponse<any>, httpProxyOptions?: NextHttpProxyMiddlewareOptions) => Promise<any>;
export default httpProxyMiddleware;
