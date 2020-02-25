import { rewritePath } from "./index";

describe("Test `rewritePath` functionn ", () => {
  test("Replace root URI context", () => {
    const originUrl = "/api/a/b";
    expect("/auth/a/b").toEqual(rewritePath(originUrl, { "/api": "/auth" }));
  });

  test("Remove root URI context", () => {
    const originUrl = "/api/a/b";
    expect("/auth/a/b").toEqual(rewritePath(originUrl, { "/api": "/auth" }));
  });
});
