import assert from "node:assert/strict";
import test from "node:test";
import worker from "../worker/index.js";

const username = "reviewer";
const password = "local-test-only";

function authHeader(user = username, pass = password) {
  return `Basic ${btoa(`${user}:${pass}`)}`;
}

function makeEnv(overrides = {}) {
  return {
    SITE_MODE: "review",
    REVIEW_USERNAME: username,
    REVIEW_PASSWORD: password,
    ASSETS: {
      async fetch(request) {
        const pathname = new URL(request.url).pathname;
        return new Response(`asset:${new URL(request.url).pathname}`, {
          headers: {
            "Cache-Control": "public, max-age=3600",
            "Content-Type": pathname.endsWith(".html")
              ? "text/html; charset=utf-8"
              : "application/octet-stream"
          }
        });
      }
    },
    ...overrides
  };
}

function assertProtectedHeaders(response) {
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex, nofollow");
}

function assertPublicHeaders(response) {
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("X-Robots-Tag"), null);
}

test("missing secrets fail closed without serving static content", async () => {
  const response = await worker.fetch(new Request("https://review.test/"), {
    ASSETS: makeEnv().ASSETS
  });
  assert.equal(response.status, 503);
  assertProtectedHeaders(response);
  assert.match(await response.text(), /not configured/i);
});

test("missing and unrecognized SITE_MODE values default to review", async () => {
  for (const mode of [undefined, "typo", "PUBLIC", ""]) {
    const response = await worker.fetch(
      new Request("https://namjin.kr/styles.css"),
      makeEnv({ SITE_MODE: mode })
    );
    assert.equal(response.status, 401);
    assert.match(response.headers.get("WWW-Authenticate"), /^Basic realm=/);
    assertProtectedHeaders(response);
  }
});

test("missing and malformed authorization return a protected Basic challenge", async () => {
  for (const authorization of [null, "Basic !!!", "Bearer token"]) {
    const headers = authorization ? { Authorization: authorization } : {};
    const response = await worker.fetch(
      new Request("https://review.test/president_assets/jin_nam.jpg", { headers }),
      makeEnv()
    );
    assert.equal(response.status, 401);
    assert.match(response.headers.get("WWW-Authenticate"), /^Basic realm=/);
    assertProtectedHeaders(response);
    assert.doesNotMatch(await response.text(), /local-test-only|reviewer/);
  }
});

test("incorrect credentials are rejected", async () => {
  const response = await worker.fetch(
    new Request("https://review.test/statement.html", {
      headers: { Authorization: authHeader(username, "wrong-password") }
    }),
    makeEnv()
  );
  assert.equal(response.status, 401);
  assertProtectedHeaders(response);
});

test("review mode replaces source robots metadata with noindex", async () => {
  const response = await worker.fetch(
    new Request("https://namjin.kr/statement.html", {
      headers: { Authorization: authHeader() }
    }),
    makeEnv({
      ASSETS: {
        async fetch() {
          return new Response(
            '<!doctype html><html><head><meta name="robots" content="index, follow"><title>test</title></head><body></body></html>',
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        }
      }
    })
  );
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.doesNotMatch(html, /content="index, follow"/);
  assertProtectedHeaders(response);
});

test("public mode serves HTML and static assets without secrets or search blocking", async () => {
  const env = makeEnv({
    SITE_MODE: "public",
    REVIEW_USERNAME: undefined,
    REVIEW_PASSWORD: undefined,
    ASSETS: {
      async fetch(request) {
        if (new URL(request.url).pathname.endsWith(".html")) {
          const html =
            '<!doctype html><html><head><meta name="robots" content="noindex, nofollow"><meta name="viewport" content="width=device-width"></head><body>site</body></html>';
          return new Response(
            request.method === "HEAD" ? null : html,
            {
              headers: {
                "Content-Type": "text/html; charset=utf-8",
                "X-Robots-Tag": "noindex, nofollow",
                "Cache-Control": "public, max-age=3600",
                "Content-Length": String(html.length)
              }
            }
          );
        }
        return new Response("static asset", {
          headers: {
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  });

  for (const host of ["namjin.kr", "www.namjin.kr", "review.test"]) {
    for (const pathname of ["/", "/statement.html"]) {
      const htmlResponse = await worker.fetch(new Request(`https://${host}${pathname}`), env);
      const html = await htmlResponse.text();
      assert.equal(htmlResponse.status, 200);
      assert.match(html, /<meta name="robots" content="index, follow">/);
      assert.doesNotMatch(html, /noindex|nofollow/);
      assertPublicHeaders(htmlResponse);
    }

    for (const pathname of [
      "/styles.css",
      "/app.js",
      "/president_assets/jin_nam.jpg",
      "/president_assets/sample.pdf"
    ]) {
      const assetResponse = await worker.fetch(new Request(`https://${host}${pathname}`), env);
      assert.equal(assetResponse.status, 200);
      assert.equal(await assetResponse.text(), "static asset");
      assertPublicHeaders(assetResponse);
    }
  }

  const headResponse = await worker.fetch(
    new Request("https://namjin.kr/", { method: "HEAD" }),
    env
  );
  assert.equal(headResponse.status, 200);
  assert.equal(headResponse.headers.get("Content-Length"), null);
  assertPublicHeaders(headResponse);
});

test("robots.txt follows the selected mode and remains protected in review", async () => {
  const reviewResponse = await worker.fetch(
    new Request("https://review.test/robots.txt"),
    makeEnv()
  );
  assert.equal(reviewResponse.status, 401);
  assertProtectedHeaders(reviewResponse);

  const authorizedReview = await worker.fetch(
    new Request("https://review.test/robots.txt", {
      headers: { Authorization: authHeader() }
    }),
    makeEnv()
  );
  assert.equal(await authorizedReview.text(), "User-agent: *\nDisallow: /\n");
  assertProtectedHeaders(authorizedReview);

  const publicResponse = await worker.fetch(
    new Request("https://review.test/robots.txt"),
    makeEnv({ SITE_MODE: "public", REVIEW_USERNAME: undefined, REVIEW_PASSWORD: undefined })
  );
  assert.equal(publicResponse.status, 200);
  assert.equal(await publicResponse.text(), "User-agent: *\nAllow: /\n");
  assertPublicHeaders(publicResponse);
});

test("valid credentials can fetch HTML, scripts, images, and PDFs with private headers", async () => {
  for (const pathname of [
    "/",
    "/statement.html",
    "/app.js",
    "/president_assets/jin_nam.jpg",
    "/president_assets/sample.pdf"
  ]) {
    const response = await worker.fetch(
      new Request(`https://review.test${pathname}`, {
        headers: { Authorization: authHeader() }
      }),
      makeEnv()
    );
    assert.equal(response.status, 200);
    const expectedPath = pathname === "/" ? "/index.html" : pathname;
    assert.ok((await response.text()).includes(`asset:${expectedPath}`));
    assertProtectedHeaders(response);
  }
});

test("security headers are applied to asset redirects and asset failures", async () => {
  const redirectResponse = await worker.fetch(
    new Request("https://review.test/redirect", {
      headers: { Authorization: authHeader() }
    }),
    makeEnv({
      ASSETS: {
        async fetch() {
          return Response.redirect("https://review.test/statement.html", 302);
        }
      }
    })
  );
  assert.equal(redirectResponse.status, 302);
  assertProtectedHeaders(redirectResponse);

  const failedResponse = await worker.fetch(
    new Request("https://review.test/", {
      headers: { Authorization: authHeader() }
    }),
    makeEnv({
      ASSETS: {
        async fetch() {
          throw new Error("private diagnostic detail");
        }
      }
    })
  );
  assert.equal(failedResponse.status, 502);
  assertProtectedHeaders(failedResponse);
  assert.doesNotMatch(await failedResponse.text(), /private diagnostic detail/);
});
