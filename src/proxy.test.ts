import http, { IncomingMessage, Server, ServerResponse } from "http";
import { AddressInfo } from "net";
import httpProxyMiddleware from "./index";

const listen = (server: Server): Promise<number> =>
  new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as AddressInfo).port));
  });

const close = (server: Server): Promise<void> =>
  new Promise((resolve) => server.close(() => resolve()));

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

describe("httpProxyMiddleware request body", () => {
  let upstream: Server;
  let gateway: Server;
  let gatewayPort: number;
  let received: { contentLength?: string; body?: string };

  beforeEach(async () => {
    received = {};
    upstream = http.createServer(async (req, res) => {
      received.contentLength = req.headers["content-length"];
      received.body = await readBody(req);
      res.end("ok");
    });
    const upstreamPort = await listen(upstream);

    // Mimics a Next.js API route: the body is already parsed into an object.
    gateway = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
      const raw = await readBody(req);
      (req as any).body = JSON.parse(raw);
      await httpProxyMiddleware(req as any, res as any, {
        target: `http://127.0.0.1:${upstreamPort}`,
        proxyTimeout: 2000,
      }).catch(() => {
        res.statusCode = 502;
        res.end();
      });
    });
    gatewayPort = await listen(gateway);
  });

  afterEach(async () => {
    await close(gateway);
    await close(upstream);
  });

  test("sends a Content-Length that matches the re-serialized body", async () => {
    // Whitespace makes the original payload longer than JSON.stringify's output.
    const payload = '{ "name": "next", "tags": [ 1, 2, 3 ] }';

    const status = await new Promise<number | undefined>((resolve, reject) => {
      const req = http.request(
        {
          port: gatewayPort,
          method: "POST",
          path: "/",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload),
          },
        },
        (res) => {
          res.resume();
          res.on("end", () => resolve(res.statusCode));
        },
      );
      req.on("error", reject);
      req.end(payload);
    });

    const expected = JSON.stringify(JSON.parse(payload));
    expect(status).toBe(200);
    expect(received.body).toBe(expected);
    expect(received.contentLength).toBe(String(Buffer.byteLength(expected)));
  });
});
