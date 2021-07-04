import puppteer, { Page, Puppeteer } from 'puppeteer'



export default class CreatePdf{
    private browser!:puppteer.Browser
    private pdfOptions !: puppteer.PDFOptions


    constructor(_pdfOtpions: puppteer.PDFOptions){
        this.pdfOptions= _pdfOtpions
    }

    create = async (html:string):Promise<Buffer> => {
        this.browser = await puppteer.launch();
        let page = await this.browser.newPage();
        await page.setContent(html);
        let pdf =  await page.pdf(this.pdfOptions)
        return pdf
    }
}