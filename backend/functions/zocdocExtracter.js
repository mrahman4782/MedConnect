import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import userAgent from 'user-agents';
import randomUseragent from 'random-useragent';

puppeteer.use(StealthPlugin());

async function wait(milliseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';

export async function searchHandler(specialty, zip){

    try{
        const browser = await puppeteer.launch({headless: true});
        const url = 'https://www.zocdoc.com/';
        
        // Navigate to site & enter the appropriate fields
        const userAgent = randomUseragent.getRandom();
        const UA = USER_AGENT;

        let page = await botBypass(browser, UA);
        //await page.setUserAgent(userAgent.random().toString())
        console.log('hi');

        await wait(2000);
        const navigationPromise = page.waitForNavigation({ timeout: 0, waitUntil: 'networkidle0' });
        await page.goto(url);
        await wait(2000);
        console.log("At link");
        await navigationPromise;
    
        await page.waitForSelector('#root > div.sc-1jvx0pj-0.cNarqa.sc-ifbrwu-0.eIMjFf > main > div:nth-child(1) > section > div > div > div > form > div > button');
        await wait(1000);
        await page.type('#root > div.sc-1jvx0pj-0.cNarqa.sc-ifbrwu-0.eIMjFf > main > div:nth-child(1) > section > div > div > div > form > div > div > div > div.sc-1roi23o-3.hxGZzh > div > div > div > div.sc-1268n4o-1.jeLuPY > input', specialty);
        await wait(2000);
        await page.type('#root > div.sc-1jvx0pj-0.cNarqa.sc-ifbrwu-0.eIMjFf > main > div:nth-child(1) > section > div > div > div > form > div > div > div > div.sc-1roi23o-4.AOvFj > div > div > div > div.sc-1j3nrry-5.izURlg > input', zip);
        await wait(1000);
        await page.click('#root > div.sc-1jvx0pj-0.cNarqa.sc-ifbrwu-0.eIMjFf > main > div:nth-child(1) > section > div > div > div > form > div > button');
        
        console.log('mo');
        await navigationPromise;

        try {
            await page.waitForSelector('#root > div > div > div.sc-jptKe.carCMT > span.sc-eHRHtx.glSlbk > button');
            await wait(1000);
            await page.click('#root > div > div > div.sc-jptKe.carCMT > span.sc-eHRHtx.glSlbk > button');
            
        } catch (error) {
            
            try {
                await page.waitForSelector('#skip-button');
                await wait(1000);
                await page.click('#skip-button');

            } catch (err) {   
                console.log(err);
            }
        }
    }   


    catch(error){
        console.log(error)
    }

}

async function botBypass(browser, UA){
        
    let page = await browser.newPage();

    //Randomize viewport size
    // await page.setViewport({
    //     width: 1920 + Math.floor(Math.random() * 100),
    //     height: 3000 + Math.floor(Math.random() * 100),
    //     deviceScaleFactor: 1,
    //     hasTouch: false,
    //     isLandscape: false,
    //     isMobile: false,
    // });

    await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);

    //Skip images/styles/fonts loading for performance
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.evaluateOnNewDocument(() => {
        // Pass webdriver check
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Pass chrome check
        window.chrome = {
            runtime: {},
            // etc.
        };
    });

    await page.evaluateOnNewDocument(() => {
        //Pass notifications check
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5],
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `languages` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });

    return page;
}

searchHandler('GYN', '11219');