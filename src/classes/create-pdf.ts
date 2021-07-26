import puppeteer, { LaunchOptions, BrowserConnectOptions, BrowserLaunchArgumentOptions } from 'puppeteer'
import hbs from 'handlebars'
// import chromium from "chrome-aws-lambda"
type PuppeteerLounchOptions =  BrowserLaunchArgumentOptions & LaunchOptions & BrowserConnectOptions ;

export default class CreatePdf{
    private pdfOptions !: puppeteer.PDFOptions
    private lounch!:PuppeteerLounchOptions


    /**
     * 
     * @param _pdfOtpions Puppeteers pdfoprions
     * @param _lounch  Puppeteer Lounch Options
     */
    constructor(_pdfOtpions: puppeteer.PDFOptions, _lounch?:PuppeteerLounchOptions){
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
     * creates the of PDF from pupp
     * @param html string
     * @param data data to handlebars 
     * @returns buffer
     */
    create = async (html:string, data?:any):Promise<Buffer> => {
        let browser = await puppeteer.launch(this.lounch);
        let page = await browser.newPage();
        let source =  this.compileHtmlString(html, data)
        await page.setContent(source);
        let pdf =  await page.pdf(this.pdfOptions)
        await page.close()
        await browser.close()
        return pdf
    }

        /**
     * creates the of PDF file from chrome-aws-lambda
     * More suted for serveress appliation like next js
     * @param html string
     * @param data data to handlebars 
     * @returns buffer
     */
    // createFromChromium = async (html:string, data?:any):Promise<Buffer> => {
    //     let browser = await chromium.puppeteer.launch(this.lounch);
    //     let page = await browser.newPage();
    //     let source =  this.compileHtmlString(html, data)
    //     await page.setContent(source);
    //     let pdf =  await page.pdf(this.pdfOptions)
    //     await page.close()
    //     await browser.close()
    //     return pdf
    // }

}


