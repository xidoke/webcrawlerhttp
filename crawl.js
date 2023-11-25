const jsdom = require("jsdom")
const { JSDOM } = jsdom

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const document = dom.window.document;
    const listTagA = document.querySelectorAll("a");
    listTagA.forEach(link => {
        if (link.href.slice(0, 1) === '/') {
            try {
                const relURL = new URL(`${baseURL}${link.href}`);
                urls.push(relURL.href)
            } catch (error) {
                console.log('error URL');
            }
        } else {
            try {
              const relURL = new URL(`${link.href}`);
              urls.push(relURL.href);
            } catch (error) {
              console.log("error URL");
            }
        }
    })
    return urls
}


function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}