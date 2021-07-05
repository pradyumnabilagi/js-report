import puppteer, { Page, Puppeteer } from 'puppeteer'
import hbs from 'handlebars'
/**
 * This for fromnt end
 */
export default class CreatePdf{
    private browser!:puppteer.Browser
    private pdfOptions !: puppteer.PDFOptions


    /**
     * 
     * @param _pdfOtpions Puppeteers pdfoprions
     */
    constructor(_pdfOtpions: puppteer.PDFOptions){
        this.pdfOptions= _pdfOtpions
    }


    /**
     * creates the of PDF file
     * @param html string
     * @param data data to handlebars 
     * @returns buffer
     */
    create = async (html:string, data?:any):Promise<Buffer> => {
        this.browser = await puppteer.launch();
        let page = await this.browser.newPage();
        await page.setContent(html);
        let pdf =  await page.pdf(this.pdfOptions)
        await page.close()
        await this.browser.close()
        return pdf
    }

}