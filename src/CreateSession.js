const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function CreateBrowser(proxy){
    let args = ['--no-sandbox', '--disable-setuid-sandbox'];
    
    if (proxy){
        proxy = proxy.split('@')[1];
        args.push(`--proxy-server=${proxy}`);
    }
    
    return await puppeteer.launch({
        headless:false,
        args:args
    });
}

module.exports = CreateBrowser;
