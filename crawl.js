const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, pages) {
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizeCurrentURL = normalizeURL(currentURL);
  if (pages[normalizeCurrentURL] > 0) {
    pages[normalizeCurrentURL]++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;

  console.log(`actively crawling: ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status}, on page ${currentURL}`
      );
      return pages;
    }
    const contentType = resp.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType}, on page ${currentURL}`
      );
      return pages;
    }
    const htmlBody = await resp.text();

    nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
      }
    return pages
  } catch (error) {
    console.log(`error in fetch: ${error.message}, on page: ${currentURL}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const document = dom.window.document;
  const listTagA = document.querySelectorAll("a");
  listTagA.forEach((link) => {
    if (link.href.slice(0, 1) === "/") {
      try {
        const relURL = new URL(`${baseURL}${link.href}`);
        urls.push(relURL.href);
      } catch (error) {
        console.log("error URL");
      }
    } else {
      try {
        const relURL = new URL(`${link.href}`);
        urls.push(relURL.href);
      } catch (error) {
        console.log("error URL");
      }
    }
  });
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
