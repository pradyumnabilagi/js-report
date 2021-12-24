
import hbs from 'handlebars'
import htmltoPdfMake from "html-to-pdfmake"


export default class CreatePdf{

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
        // convert html to pdfmake string
        let source =  this.compileHtmlString(html, data)
        const pdfmakeData = htmltoPdfMake(source)
        
       

    }

    // create = async (html:string, data?:any):Promise<Buffer> => {
    //     let browser = await puppeteer.launch(this.lounch);
    //     let page = await browser.newPage();
    //     try {
    //         let source =  this.compileHtmlString(html, data)
    //         await page.setContent(source);
    //         let pdf =  await page.pdf(this.pdfOptions)
    //         return pdf
    //     } catch (error) {
    //         throw error
    //     }finally{
    //         console.log("closed pdf")
    //         await page.close()
    //         await browser.close()
    //     }
        
       

    // }


}


