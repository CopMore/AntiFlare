const CreateBrowser = require('./CreateSession');
//const { Cookie } = require('tough-cookie');

async function HandleChallenge(url) {
  const browser = await CreateBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      timeout: 15 * 1000,
      waitUntil: 'domcontentloaded'
    });

    let count = 1;
    let content = await page.content();
    

    while(content.includes('challenge-form')) {
      await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15*1000 });
      content = await page.content();
      if (count++ === 100) {
        throw new Error('timeout on just a moment');
      }
    }
    
    let html = await page.content();
    let cookie = await page.cookies();
    await browser.close();
    
    return {
      code:200,
      data:html,
      cookie:cookie
    }
  } catch (e) {
    await browser.close();
    return {
      code: 500,
      msg: e.message
    }
  }
}

module.exports = HandleChallenge;
