const CACHE_CONTROL = "private, no-store";

function textResponse(body, status, mode, extraHeaders = {}) {
  const headers = new Headers({
    "Cache-Control": CACHE_CONTROL
  });
  if (mode === "review") {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  headers.set("Content-Type", "text/plain; charset=utf-8");
  for (const [name, value] of Object.entries(extraHeaders)) {
    headers.set(name, value);
  }
  return new Response(body, { status, headers });
}

function replaceRobotsMeta(html, mode) {
  const withoutRobotsMeta = html.replace(/<meta\b[^>]*>/gi, tag => {
    const name = tag.match(/\bname\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
    return name && (name[1] ?? name[2] ?? name[3]).toLowerCase() === "robots" ? "" : tag;
  });
  const content = mode === "public" ? "index, follow" : "noindex, nofollow";
  const directive = `<meta name="robots" content="${content}">`;
  if (/<head\b[^>]*>/i.test(withoutRobotsMeta)) {
    return withoutRobotsMeta.replace(/<head\b[^>]*>/i, head => `${head}\n${directive}`);
  }
  if (/<html\b[^>]*>/i.test(withoutRobotsMeta)) {
    return withoutRobotsMeta.replace(/<html\b[^>]*>/i, html => `${html}\n<head>${directive}</head>`);
  }
  if (/<body\b[^>]*>/i.test(withoutRobotsMeta)) {
    return withoutRobotsMeta.replace(/<body\b/i, `<head>${directive}</head>\n<body`);
  }
  return `${directive}\n${withoutRobotsMeta}`;
}

function robotsResponse(mode) {
  const body = mode === "public"
    ? "User-agent: *\nAllow: /\n"
    : "User-agent: *\nDisallow: /\n";
  return textResponse(body, 200, mode);
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

async function withModeResponse(response, mode) {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", CACHE_CONTROL);
  if (mode === "review") {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    headers.delete("X-Robots-Tag");
  }

  const contentType = headers.get("Content-Type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  headers.delete("Content-Length");
  headers.delete("Content-Encoding");
  if (!response.body) {
    return new Response(null, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  const html = replaceRobotsMeta(await response.text(), mode);
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request, env) {
    const mode = env.SITE_MODE === "public" ? "public" : "review";

    if (mode === "review" && (
      typeof env.REVIEW_USERNAME !== "string" ||
      env.REVIEW_USERNAME.length === 0 ||
      typeof env.REVIEW_PASSWORD !== "string" ||
      env.REVIEW_PASSWORD.length === 0
    )) {
      return textResponse("Review credentials are not configured.", 503, mode);
    }

    if (mode === "review") {
      const credentials = parseBasicAuthorization(request.headers.get("Authorization"));
      if (!credentials) {
        return textResponse("Authentication required.", 401, mode, {
          "WWW-Authenticate": 'Basic realm="Namjin Review", charset="UTF-8"'
        });
      }

      const usernameMatches = timingSafeEqual(credentials.username, env.REVIEW_USERNAME);
      const passwordMatches = timingSafeEqual(credentials.password, env.REVIEW_PASSWORD);
      if (!(usernameMatches & passwordMatches)) {
        return textResponse("Authentication required.", 401, mode, {
          "WWW-Authenticate": 'Basic realm="Namjin Review", charset="UTF-8"'
        });
      }
    }

    if (new URL(request.url).pathname === "/robots.txt") {
      return robotsResponse(mode);
    }

    if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
      return textResponse("Review assets are unavailable.", 503, mode);
    }

    try {
      const requestUrl = new URL(request.url);
      const assetRequest = requestUrl.pathname === "/"
        ? new Request(new URL("/index.html", requestUrl), request)
        : request;
      return await withModeResponse(await env.ASSETS.fetch(assetRequest), mode);
    } catch {
      return textResponse("Review assets are unavailable.", 502, mode);
    }
  }
};
