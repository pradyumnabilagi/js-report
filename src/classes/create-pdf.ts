import puppteer, { LaunchOptions, BrowserConnectOptions, BrowserLaunchArgumentOptions } from 'puppeteer'
import hbs from 'handlebars'
type PuppeteerLounchOptions =  BrowserLaunchArgumentOptions & LaunchOptions & BrowserConnectOptions ;

export default class CreatePdf{
    private browser!:puppteer.Browser
    private pdfOptions !: puppteer.PDFOptions
    private lounch!:PuppeteerLounchOptions


    /**
     * 
     * @param _pdfOtpions Puppeteers pdfoprions
     * @param _lounch  Puppeteer Lounch Options
     */
    constructor(_pdfOtpions: puppteer.PDFOptions, _lounch?:PuppeteerLounchOptions){
        this.pdfOptions= _pdfOtpions
        if(_lounch !== undefined){
            this.lounch = _lounch
        }
       
    }


    
    /**
     * This comples the html
     * @param html string
     * @param data data for mofiying html
     * @returns 
     */
     compileHtmlString = (html:string, data?:any):any=>{
        let str =  hbs.compile(html)(data)
        return str
    }

    /**
     * creates the of PDF file
     * @param html string
     * @param data data to handlebars 
     * @returns buffer
     */
    create = async (html:string, data?:any):Promise<Buffer> => {
        this.browser = await puppteer.launch(this.lounch);
        let page = await this.browser.newPage();
        let source =  this.compileHtmlString(html, data)
        await page.setContent(source);
        let pdf =  await page.pdf(this.pdfOptions)
        await page.close()
        await this.browser.close()
        return pdf
    }

}


