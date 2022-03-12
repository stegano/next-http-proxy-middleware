# Next.js HTTP Proxy Middleware
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors-)
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

- Replaces URL information matching the pattern with another string.
  - Priority is determined in the order entered in the array.
  - If the request URL matches the pattern `pathRewrite.patternStr` replace the URL string with the value `pathRewrite.replaceStr`.

### `onProxyInit` option
- You can access the `http-proxy` instance using the `onProxyInit` option. See the example below.
  
  ```ts
  const handleProxyInit = (proxy: httpProxy) => {
    /**
     * Check the list of bindable events in the `http-proxy` specification.
     * @see https://www.npmjs.com/package/http-proxy#listening-for-proxy-events
     */
    proxy.on('proxyReq', (proxyReq, req, res) => {
      ...
    });
    proxy.on('proxyRes', (proxyRes, req, res) => {
      ...
    });
  };

  export default async (req: NextApiRequest, res: NextApiResponse) 
    => httpProxyMiddleware(req, res, {
      ...
      target: 'http://example.com',
      onProxyInit: handleProxyInit,
    }
  );
  ```

#### Example

- Refer to the following for how to use Next.js API Middleware

  - [Next.js API Middlewares Guide](https://nextjs.org/docs/api-routes/api-middlewares)

  ```ts
  // pages/api/[...all].ts
  export const config = {
    api: {
      // Enable `externalResolver` option in Next.js
      externalResolver: true,
    },
  }

  export default (req: NextApiRequest, res: NextApiResponse) => (
    isDevelopment
      ? httpProxyMiddleware(req, res, {
        // You can use the `http-proxy` option
        target: 'https://www.example.com',
        // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
        pathRewrite: [{
          patternStr: '^/api/new',
          replaceStr: '/v2'
        }, {
          patternStr: '^/api',
          replaceStr: ''
        }],
      })
      : res.status(404).send(null)
  );
  ```
  - `externalResolver` is an explicit flag that tells the server that this route is being handled by an external resolver. Enabling this option disables warnings for unresolved requests.
    - See the issues below
      - https://github.com/stegano/next-http-proxy-middleware/issues/32
      - https://github.com/stegano/next-http-proxy-middleware/issues/21

#### Using `multipart/form-data`
* If you are using the `multipart/form-data`, refer to the Issues below
  * https://github.com/stegano/next-http-proxy-middleware/issues/33
  * https://github.com/vercel/next.js/pull/7686

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://iamdenny.com"><img src="https://avatars.githubusercontent.com/u/1505166?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Denny Lim</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/issues?q=author%3Aiamdenny" title="Bug reports">🐛</a> <a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=iamdenny" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/larrifax"><img src="https://avatars.githubusercontent.com/u/144189?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kristian Tryggestad</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/issues?q=author%3Alarrifax" title="Bug reports">🐛</a> <a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=larrifax" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gthb"><img src="https://avatars.githubusercontent.com/u/153580?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gunnlaugur Thor Briem</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=gthb" title="Code">💻</a> <a href="#ideas-gthb" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://ottovw.com"><img src="https://avatars.githubusercontent.com/u/1045946?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Otto von Wesendonk</b></sub></a><br /><a href="#security-ottovw" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/dsilvasc"><img src="https://avatars.githubusercontent.com/u/24484414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Daniel Silva</b></sub></a><br /><a href="#ideas-dsilvasc" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://lumenstudio.dev/"><img src="https://avatars.githubusercontent.com/u/5436545?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yann Pringault</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=Kerumen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lorenzodejong"><img src="https://avatars.githubusercontent.com/u/30781484?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lorenzo</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=lorenzodejong" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://medium.com/@timon.grassl"><img src="https://avatars.githubusercontent.com/u/34568407?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Timon Grassl</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/issues?q=author%3Atgrassl" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/abhinavkumar940"><img src="https://avatars.githubusercontent.com/u/1189133?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Abhinav Kumar</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=abhinavkumar940" title="Documentation">📖</a></td>
    <td align="center"><a href="https://jackcuthbert.dev/"><img src="https://avatars.githubusercontent.com/u/5564612?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jack Cuthbert</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=JackCuthbert" title="Documentation">📖</a></td>
    <td align="center"><a href="https://vytenis.kuciauskas.lt"><img src="https://avatars.githubusercontent.com/u/468006?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vytenis</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=FDiskas" title="Documentation">📖</a></td>
    <td align="center"><a href="https://dariosky.it"><img src="https://avatars.githubusercontent.com/u/705644?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dario Varotto</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=dariosky" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/johannbrynjar"><img src="https://avatars.githubusercontent.com/u/2641440?v=4?s=100" width="100px;" alt=""/><br /><sub><b>johannbrynjar</b></sub></a><br /><a href="https://github.com/stegano/next-http-proxy-middleware/issues?q=author%3Ajohannbrynjar" title="Bug reports">🐛</a> <a href="https://github.com/stegano/next-http-proxy-middleware/commits?author=johannbrynjar" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
