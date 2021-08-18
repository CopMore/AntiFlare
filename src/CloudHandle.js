const CreateBrowser = require('./CreateSession');

async function HandleChallenge(url,proxy) {
  const browser = await CreateBrowser(proxy);
  const page = await browser.newPage();

  if (proxy){
    let user = proxy.split('@')[0].split(':')[0];
    let passw = proxy.split('@')[0].split(':')[1];
    await page.authenticate({username:user,password:passw});
  }

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
      if (count++ === 25) {
        throw new Error('timeout');
      }
    }
    
    if (content.includes('cf-error-details') || content.includes('cf_captcha_kind')){
      throw new Error('proxy ban');
    }
    
    let html = await page.content();
    let cookie = await page.cookies();
    await browser.close();
      
    return {
        code:200,
        data:html,
        cookie:cookie
    }
  } 
  catch (e) {
    await browser.close();
    return {
      code: 500,
      msg: e.message
    }
  }
}

module.exports = HandleChallenge;
