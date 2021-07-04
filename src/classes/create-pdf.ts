import puppteer, { Page, Puppeteer } from 'puppeteer'
import hbs from 'handlebars'



export default class CreatePdf{
    private browser!:puppteer.Browser
    private pdfOptions !: puppteer.PDFOptions


    constructor(_pdfOtpions: puppteer.PDFOptions){
        this.pdfOptions= _pdfOtpions
    }

    create = async (html:string, data?:any):Promise<Buffer> => {

        this.browser = await puppteer.launch();
        let page = await this.browser.newPage();
        let source = hbs.compile(html)(data)
        await page.setContent(source);
        let pdf =  await page.pdf(this.pdfOptions)
        await this.browser.close()
        return pdf
    }
}