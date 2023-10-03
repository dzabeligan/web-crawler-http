const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://example.com/path";
  const actual = normalizeURL(input);

  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip protocol, http", () => {
  const input = "http://example.com/path";
  const actual = normalizeURL(input);

  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://example.com/path/";
  const actual = normalizeURL(input);

  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://EXAMPLE.com/path/";
  const actual = normalizeURL(input);

  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL no protocol in input", () => {
  const input = "example.com/path/";
  const actual = normalizeURL(input);

  const expected = "";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML empty", () => {
  const input = "";
  const baseURL = "https://example.com";
  const actual = getURLsFromHTML(input, baseURL);

  const expected = [];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML one link", () => {
  const input = `
  <html>
    <body>
      <a href='https://example.com/path'>link</a>
    </body>
  </html>
  `;
  const baseURL = "https://example.com";
  const actual = getURLsFromHTML(input, baseURL);

  const expected = ["https://example.com/path"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML two links", () => {
  const input = `
  <html>
    <body>
      <a href='https://example.com/path'>link</a>
      <a href='https://example.com/path2'>link</a>
    </body>
  </html>
  `;
  const baseURL = "https://example.com";
  const actual = getURLsFromHTML(input, baseURL);

  const expected = ["https://example.com/path", "https://example.com/path2"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML two links, one relative", () => {
  const input = `
  <html>
    <body>
      <a href='https://example.com/path'>link</a>
      <a href='/path2'>link</a>
    </body>
  </html>
  `;
  const baseURL = "https://example.com";
  const actual = getURLsFromHTML(input, baseURL);

  const expected = ["https://example.com/path", "https://example.com/path2"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid link", () => {
  const input = `
  <html>
    <body>
      <a href='https://example.com/path'>link</a>
      <a href='invalid'>link</a>
    </body>
  </html>
  `;
  const baseURL = "https://example.com";
  const actual = getURLsFromHTML(input, baseURL);

  const expected = ["https://example.com/path"];
  expect(actual).toEqual(expected);
});
