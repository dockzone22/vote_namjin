import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const dataSource = await readFile(new URL("../data.js", import.meta.url), "utf8");
const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

function setup(changeData = () => {}) {
  const listeners = new Map();
  const listen = name => ({
    addEventListener(type, callback) { listeners.set(`${name}:${type}`, callback); }
  });
  const hero = { replaceWith(player) { this.player = player; } };
  const buttons = [];
  const cards = {
    innerHTML: "",
    querySelectorAll() { return buttons; }
  };
  const player = { replaceChildren(...children) { this.children = children; } };
  const title = {};
  const link = {};
  const closeButton = listen("closeButton");
  const dialog = {
    ...listen("dialog"),
    showModal() { this.open = true; },
    close() {
      this.open = false;
      listeners.get("dialog:close")();
    }
  };
  const elements = {
    "hero-video-slot": hero,
    "audience-videos": cards,
    "video-dialog": dialog,
    "video-dialog-title": title,
    "video-dialog-player": player,
    "video-dialog-youtube": link,
    "video-dialog-close": closeButton
  };
  const warnings = [];
  const context = vm.createContext({
    window: {},
    document: {
      body: { classList: { contains: () => false } },
      getElementById: id => elements[id] || null,
      createElement: tag => ({ tag }),
      querySelector: () => null,
      addEventListener: () => {}
    },
    location: { href: "http://localhost/index.html", pathname: "/index.html" },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    console: { warn: message => warnings.push(message) },
    URL
  });
  vm.runInContext(dataSource, context);
  changeData(context.window.SITE_DATA);
  context.window.SITE_DATA.audienceVideos.forEach((video, index) => {
    if (video.url && !video.url.includes("invalid")) {
      buttons.push({
        ...listen(`button${index}`),
        dataset: { videoIndex: String(index) },
        focus() { this.focused = true; }
      });
    }
  });
  vm.runInContext(appSource, context);
  return { hero, cards, buttons, player, title, link, dialog, listeners, warnings };
}

test("representative player does not autoplay and missing audience links stay disabled", () => {
  const { hero, cards } = setup();
  assert.equal(hero.player.src, "https://www.youtube.com/embed/jgwUU38TEPQ");
  assert.equal(hero.player.title, "남진 총장 후보 대표 영상");
  assert.equal((cards.innerHTML.match(/ disabled>/g) || []).length, 3);
  assert.equal((cards.innerHTML.match(/준비 중/g) || []).length, 3);
  assert.doesNotMatch(cards.innerHTML, /jgwUU38TEPQ/);
  assert.match(html, /<dialog id="video-dialog"[^>]*aria-labelledby="video-dialog-title"/);
  assert.match(html, /id="video-dialog-close"[^>]*autofocus/);
});

test("a configured video opens in one modal and close or cancel removes the player and restores focus", () => {
  for (const closeMethod of ["closeButton:click", "dialog:cancel"]) {
    const result = setup(data => {
      data.audienceVideos[0].url = "https://www.youtube.com/watch?v=abcdefghijk";
    });
    assert.match(result.cards.innerHTML, /https:\/\/i\.ytimg\.com\/vi\/abcdefghijk\/hqdefault\.jpg/);
    result.listeners.get("button0:click")();
    assert.equal(result.dialog.open, true);
    assert.equal(result.title.textContent, "교수님들께");
    assert.equal(result.player.children[0].src, "https://www.youtube.com/embed/abcdefghijk?autoplay=1");
    assert.equal(result.link.href, "https://www.youtube.com/watch?v=abcdefghijk");
    let prevented = false;
    result.listeners.get(closeMethod)({ preventDefault() { prevented = true; } });
    if (closeMethod === "dialog:cancel") assert.equal(prevented, true);
    assert.equal(result.dialog.open, false);
    assert.deepEqual(result.player.children, []);
    assert.equal(result.buttons[0].focused, true);
  }
});

test("invalid YouTube addresses remain disabled", () => {
  const { cards, warnings } = setup(data => {
    data.audienceVideos[0].url = "https://invalid.example/watch?v=abcdefghijk";
  });
  assert.equal((cards.innerHTML.match(/ disabled>/g) || []).length, 3);
  assert.equal(warnings.length, 1);
});
