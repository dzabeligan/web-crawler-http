function printReport(pagesVisited) {
  const sortedPages = sortPages(pagesVisited);

  console.log("===================================");
  console.log("REPORT");
  console.log("===================================");
  for (page in sortedPages) {
    console.log(`Found ${sortedPages[page]} internal links to ${page}`);
  }
}

function sortPages(pagesVisited) {
  const sortedPages = {};
  Object.keys(pagesVisited)
    .sort((a, b) => pagesVisited[b] - pagesVisited[a])
    .forEach((key) => {
      sortedPages[key] = pagesVisited[key];
    });
  return sortedPages;
}

module.exports = { sortPages, printReport };
