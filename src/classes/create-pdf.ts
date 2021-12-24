
import hbs from 'handlebars'
const  htmltoPdfMake = require("html-to-pdfmake")
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";



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
        // const pdfmakeData = htmltoPdfMake(source)
        // console.log(pdfmakeData)
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.fonts = {
            'Roboto': {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            }

        }


    
        const curPdf = async():Promise<Buffer>=>{

          return  new Promise((resolve, reject)=>{
                const curPdf = pdfMake.createPdf(
                    {
                    content: [
                        'First paragraph',
                        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
                    ]
                    
                }
                );
                curPdf.getBuffer(cb=>{
                    resolve(cb)
                })
            })
        }

        return await curPdf().then(data=>data)
    
        
        
       

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


