const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function CreateBrowser(){
    return await puppeteer.launch({
        headless:false,
        args:['--no-sandbox', '--disable-setuid-sandbox']
    });
}

module.exports = CreateBrowser;
