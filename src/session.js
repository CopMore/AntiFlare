const puppeteer = require('puppeteer-extra');
const sleep = require('sleep-promise');
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

exports.SessionCreate = async (obj) => {
    console.log(`Fetching Url : ${obj.url}`);
    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: false,
        ignoreHTTPSErrors: true,

    })
    
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(obj.timeout*1000);
    
    try {
        const res = await page.goto(obj.url);
        if (res.status() == 503 && res.headers().server.startsWith('cloudflare')) {            
            await sleep(6500);
            const html = await page.content();
            const cookie = await page.cookies();
            await browser.close();
            return {
                msg:'Success',
                data:html,
                cookies: cookie,
                code:200
            }
        }

        if (await page.$('.cf-error-code')) {
            await browser.close();
            return {
                msg:'Cloudflare has blocked this request (Code 1020 Detected)',
                code:403
            }
          }

        if (await page.$('input[name="cf_captcha_kind"]')) {            
            await browser.close();
            return {
                msg:'Need To Slove Capthca',
                code:401
            }
        }
    
    } catch (e) {
        await browser.close();
        return {
            msg: e.message,
            code:400
        }
    }
}