import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const dataSource = await readFile(new URL("../data.js", import.meta.url), "utf8");
const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

function renderDownloads(changeData = () => {}) {
  const link = { href: "./statement.html" };
  const list = { innerHTML: "" };
  const elements = { "statement-link": link, "download-list": list };
  const context = vm.createContext({
    window: {},
    document: {
      body: { classList: { contains: () => false } },
      getElementById: id => elements[id] || null,
      querySelector: () => null,
      addEventListener: () => {}
    },
    location: { href: "http://localhost:8787/index.html", pathname: "/index.html" },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    URL,
    URLSearchParams
  });
  vm.runInContext(dataSource, context);
  changeData(context.window.SITE_DATA);
  vm.runInContext(appSource, context);
  return { link, list, data: context.window.SITE_DATA };
}

test("statement button and download use the same PDF while empty items remain pending", async () => {
  const { link, list, data } = renderDownloads(data => {
    data.downloads[0].url = "";
  });
  const statement = data.downloads.find(item => item.id === "statement");
  assert.equal(statement.size, "");
  assert.equal(link.href, new URL(statement.url, "http://localhost:8787/index.html").href);
  assert.match(html, /<a\b[^>]*id="statement-link"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  const rows = [...list.innerHTML.matchAll(/<article class="download-row">([\s\S]*?)<\/article>/g)];
  assert.equal(rows.length, 3);
  for (const row of rows) {
    assert.match(row[1], /^\s*<div class="file-info">/);
    assert.doesNotMatch(row[1], /file-icon/);
  }
  for (const row of rows.slice(0, 2)) {
    assert.match(row[1], /<p>PDF · 준비 중<\/p>/);
    assert.match(row[1], /<button type="button" disabled>준비 중<\/button>/);
  }
  assert.match(rows[2][1], /<p>PDF<\/p>/);
  assert.doesNotMatch(rows[2][1], /준비 중| · /);
  assert.ok(rows[2][1].includes(`href="${link.href}" download`));
  const pdf = await readFile(new URL(`..${new URL(link.href).pathname}`, import.meta.url));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
});

test("changing the statement URL updates both links", () => {
  const { link, list } = renderDownloads(data => {
    data.downloads.find(item => item.id === "statement").url = "./president_assets/updated.pdf";
  });
  assert.equal(link.href, "http://localhost:8787/president_assets/updated.pdf");
  assert.ok(list.innerHTML.includes(`href="${link.href}" download`));
});

test("the configured pledge PDF download points to the existing renamed file", async () => {
  const { list, data } = renderDownloads();
  const pledge = data.downloads[0];
  assert.equal(pledge.url, "./president_assets/261126_공약집시안_압축.pdf");
  assert.ok(list.innerHTML.includes(`href="${new URL(pledge.url, "http://localhost:8787/index.html").href}" download`));
  assert.ok((await stat(new URL(`../${pledge.url.slice(2)}`, import.meta.url))).isFile());
});
