const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  if (process.argv.length != 3) {
    console.log("Usage: node main.js <url>");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl of ${baseURL}`);
  const pagesVisited = await crawlPage(baseURL, baseURL, {});

  printReport(pagesVisited);
}

main();
