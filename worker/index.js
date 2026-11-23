const RESPONSE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow"
};

function textResponse(body, status, extraHeaders = {}) {
  const headers = new Headers(RESPONSE_HEADERS);
  headers.set("Content-Type", "text/plain; charset=utf-8");
  for (const [name, value] of Object.entries(extraHeaders)) {
    headers.set(name, value);
  }
  return new Response(body, { status, headers });
}

function parseBasicAuthorization(value) {
  if (typeof value !== "string") return null;
  const match = /^Basic ([A-Za-z0-9+/]+={0,2})$/i.exec(value);
  if (!match || match[1].length % 4 !== 0) return null;

  let decoded;
  try {
    const binary = atob(match[1]);
    if (btoa(binary) !== match[1]) return null;
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }

  const separator = decoded.indexOf(":");
  if (separator < 0) return null;
  return {
    username: decoded.slice(0, separator),
    password: decoded.slice(separator + 1)
  };
}

function timingSafeEqual(left, right) {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  let difference = leftBytes.length ^ rightBytes.length;
  const length = Math.max(leftBytes.length, rightBytes.length);

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return difference === 0;
}

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", RESPONSE_HEADERS["Cache-Control"]);
  headers.set("X-Robots-Tag", RESPONSE_HEADERS["X-Robots-Tag"]);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request, env) {
    if (
      typeof env.REVIEW_USERNAME !== "string" ||
      env.REVIEW_USERNAME.length === 0 ||
      typeof env.REVIEW_PASSWORD !== "string" ||
      env.REVIEW_PASSWORD.length === 0
    ) {
      return textResponse("Review credentials are not configured.", 503);
    }

    const credentials = parseBasicAuthorization(request.headers.get("Authorization"));
    if (!credentials) {
      return textResponse("Authentication required.", 401, {
        "WWW-Authenticate": 'Basic realm="Namjin Review", charset="UTF-8"'
      });
    }

    const usernameMatches = timingSafeEqual(credentials.username, env.REVIEW_USERNAME);
    const passwordMatches = timingSafeEqual(credentials.password, env.REVIEW_PASSWORD);
    if (!(usernameMatches & passwordMatches)) {
      return textResponse("Authentication required.", 401, {
        "WWW-Authenticate": 'Basic realm="Namjin Review", charset="UTF-8"'
      });
    }

    if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
      return textResponse("Review assets are unavailable.", 503);
    }

    try {
      const requestUrl = new URL(request.url);
      const assetRequest = requestUrl.pathname === "/"
        ? new Request(new URL("/index.html", requestUrl), request)
        : request;
      return withSecurityHeaders(await env.ASSETS.fetch(assetRequest));
    } catch {
      return textResponse("Review assets are unavailable.", 502);
    }
  }
};
