
const htmltoPdfMake = require("html-to-pdfmake")
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
const paperSize = require("paper-size")
var jsdom = require("jsdom");




export default class CreatePdf {

    /**
     * creates the of PDF from pupp
     * @param html string
     * @param data data to handlebars 
     * @returns buffer
     */
    create = async (html: string, data: {
        paperSize:string, 
        headerbase64Image?:string
        base64:boolean;
        esign?:string
    
    }): Promise<Buffer | string> => {

        const { JSDOM } = jsdom;
        const { window } = new JSDOM("")
        const pdfmakeData = htmltoPdfMake(html, { window: window })

        const size:number = paperSize.getSize(data.paperSize, { unit: 'pixel', dpi: 72 })[0]  - 80
      
        const docDefinition = {
            pageSize: data.paperSize,

            footer: function (currentPage: any, pageCount: any) { return currentPage.toString() + ' of ' + pageCount; },
            content:[
                {image : data.headerbase64Image, width:size},
                pdfmakeData
            ]

        }

        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.fonts = {
            'Roboto': {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            }

        }



        const curPdf = async (): Promise<Buffer| string> => {
            return new Promise((resolve, reject) => {
                const curPdf = pdfMake.createPdf(docDefinition as any);
                curPdf.getBase64(cb => {
                    if(data.base64){
                        resolve(cb)
                    }else{
                        const buf = Buffer.from(cb, "base64")
                        resolve(buf)
                    }
 
                })
            })
        }

        return await curPdf().then(data => data)





    }


}


