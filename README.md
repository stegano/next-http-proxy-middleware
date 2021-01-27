# Next.js HTTP Proxy Middleware
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://iamdenny.com"><img src="https://avatars.githubusercontent.com/u/1505166?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Denny Lim</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/issues?q=author%3Aiamdenny" title="Bug reports">🐛</a> <a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=iamdenny" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/larrifax"><img src="https://avatars.githubusercontent.com/u/144189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kristian Tryggestad</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=larrifax" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gthb"><img src="https://avatars.githubusercontent.com/u/153580?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gunnlaugur Thor Briem</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=gthb" title="Code">💻</a> <a href="#ideas-gthb" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!