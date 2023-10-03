const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pagesVisited) {
  let htmlBody = "";
  try {
    if (new URL(currentURL).hostname !== new URL(baseURL).hostname) {
      return pagesVisited;
    }

    const normalizedURL = normalizeURL(currentURL);
    if (pagesVisited[normalizedURL] > 0) {
      pagesVisited[normalizedURL]++;
      return pagesVisited;
    }
    pagesVisited[normalizedURL] = 1;

    console.log(`crawling ${currentURL}`);

    const response = await fetch(currentURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (!response.headers.get("Content-Type").includes("text/html")) {
      throw new Error(`Not HTML!`);
    }
    htmlBody = await response.text();
  } catch (error) {
    console.log(`error crawling ${currentURL}: ${error}`);
  }

  const nextURLs = getURLsFromHTML(htmlBody, currentURL);
  for (const url of nextURLs) {
    pagesVisited = await crawlPage(baseURL, url, pagesVisited);
  }

  return pagesVisited;
}

const removeTrailingSlash = (url) => {
  if (url.endsWith("/")) {
    return url.slice(0, -1);
  }
  return url;
};

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);

  dom.window.document.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("http")) {
      urls.push(removeTrailingSlash(href));
    } else if (href && href.startsWith("/")) {
      urls.push(removeTrailingSlash(`${baseURL}${href}`));
    }
  });
  return urls;
}

function normalizeURL(urlString) {
  try {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.host}${urlObj.pathname}`;

    return removeTrailingSlash(hostPath);
  } catch (error) {
    console.log(`error parsing ${urlString}: ${error}`);
    return "";
  }
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
