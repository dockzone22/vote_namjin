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
    REVIEW_USERNAME: username,
    REVIEW_PASSWORD: password,
    ASSETS: {
      async fetch(request) {
        return new Response(`asset:${new URL(request.url).pathname}`, {
          headers: {
            "Cache-Control": "public, max-age=3600",
            "Content-Type": "text/html; charset=utf-8"
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

test("missing secrets fail closed without serving static content", async () => {
  const response = await worker.fetch(new Request("https://review.test/"), {
    ASSETS: makeEnv().ASSETS
  });
  assert.equal(response.status, 503);
  assertProtectedHeaders(response);
  assert.match(await response.text(), /not configured/i);
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
    assert.equal(await response.text(), `asset:${expectedPath}`);
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
