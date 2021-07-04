import puppteer from 'puppeteer'



export default class Headless{
    private browser!:puppteer.Browser
    private pdfOptions !: puppteer.PDFOptions

    constructor(){
  
    }

    private lounch = async (html:string) => {
        this.browser = await puppteer.launch();
        let page = await this.browser.newPage();
        await page.setContent(html);
        await page.pdf()
    }
}