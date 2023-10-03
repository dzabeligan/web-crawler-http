const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = {
    "example.com/path3": 10,
    "example.com/path2": 12,
    "example.com": 11,
    "example.com/path": 3,
  };
  const actual = sortPages(input);

  const expected = {
    "example.com/path2": 12,
    "example.com": 11,
    "example.com/path3": 10,
    "example.com/path": 3,
  };
  expect(actual).toEqual(expected);
});
