import { rewritePath } from "./index";

describe("Test `rewritePath` functionn ", () => {
  test("[deprecated] Replace root URI context", () => {
    const originUrl = "/api/a/b";
    expect("/auth/a/b").toEqual(rewritePath(originUrl, { "/api": "/auth" }));
  });

  test("[deprecated] Remove root URI context", () => {
    const originUrl = "/api/a/b";
    expect("/auth/a/b").toEqual(rewritePath(originUrl, { "/api": "/auth" }));
  });

  test("Replace root URI context", () => {
    const originUrl = "/api/a/b";
    expect("/auth/a/b").toEqual(rewritePath(originUrl, [{
      patternStr: "/api",
      replaceStr: "/auth"
      },
    ]));
  });

  test("Remove root URI context", () => {
    const originUrl = "/api/a/b";
    expect("/auth/a/b").toEqual(rewritePath(originUrl, [{ 
      patternStr: "/api",
      replaceStr: "/auth"
    }]));
  });
});
