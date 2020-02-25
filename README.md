# Next.js HTTP Proxy Middleware

HTTP Proxy middleware available in API Middleware provided by Next.js.

## Installation

The easiest way to install `next-http-proxy-middleware` is with [npm](https://www.npmjs.com/).

```bash
npm install next-http-proxy-middleware
```

Alternately, download the source.

```bash
git clone https://github.com/stegano/next-http-proxy-middleware.git
```

## Features

This middleware is implemented using the [`http-proxy`](https://www.npmjs.com/package/http-proxy) library. You can use the existing options provided by `http-proxy`. And you can rewrite the api path using `pathRewrite`, an additional option provided by this middleware.

- [http-proxy options](https://www.npmjs.com/package/http-proxy#options)

### `pathRewrite` option

- The `key` is a regular expression to match `url`, and the matched url string is replaced with `value`.

#### Example

- Refer to the following for how to use Nextjs API Middleware

  - [Next.js API Middlewares Guide](https://nextjs.org/docs/api-routes/api-middlewares)

```typescript
// pages/[...all].ts
...
export default (req: NextApiRequest, res: NextApiResponse) => (
  isDevelopment
    ? httpProxyMiddleware(req, res, {
      // You can use the `http-proxy` option
      target: 'https://www.example.com',
      // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
      pathRewrite: {
        '^/api/new': '/v2',
        '^/api': '',
      },
    })
    : res.status(404).send(null)
);
```
