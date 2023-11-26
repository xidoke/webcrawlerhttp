const { crawlPage } = require('./crawl');
async function main() {
    if (process.argv.length < 3) {
        console.log("no website provied");
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("to many command line args");
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`starting craw of ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    console.log(pages);
    // for (const page of Object.entries(pages)) {
    //     console.log(page);
    // }
}

main() 