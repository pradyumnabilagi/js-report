
const htmltoPdfMake = require("html-to-pdfmake");
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
const paperSize = require("paper-size");
var jsdom = require("jsdom");

export interface PDF_HEADER {
  currentPage: number;
  pageCount: number;
  pageSize: { width: number };
}

export interface PDF_FOOter {
  currentPage: number;
  pageCount: number;
  pageSize: { width: number };
}

export default class CreatePdf {
  /**
   * creates the of PDF from pupp
   * @param html string
   * @param data data to handlebars
   * @returns buffer
   */
  create = async (
    html: string,
    data: {
      paperSize: string;
      headerbase64Image?: string;
      header?: (options: PDF_HEADER) => [];
      footer?: (options: PDF_FOOter) => [];
      base64?: boolean;
      esign?: { image: string; nameLine1: string; nameLine2?: string };
      qrcode?: string;
      qrCodeWidth?:number;
      bottomMargin?: number;
      leftMargin?: number;
      rightMargin?: number;
      topMargin?: number;
      paragraphSpace ?: number
      media?:{singleImagePerPage: boolean,  content:string[]};
      
      
    }
  ): Promise<Buffer | string> => {
    const { JSDOM } = jsdom;
    const { window } = new JSDOM("");
    html = html.replace(/<!-- pagebreak -->/g,`<div class="pagebreak"> </div>`)
    const paragraphSpaceHalf = data.paragraphSpace ? data.paragraphSpace /2 : 3
    const pdfmakeData = htmltoPdfMake(html, {
      window: window,
      tableAutoSize: true,
      defaultStyles : {p : {margin:[0, paragraphSpaceHalf, 0, paragraphSpaceHalf]}}
    });


    const size: number =
      paperSize.getSize(data.paperSize, { unit: "pixel", dpi: 72 })[0] - 80;

    let content: any[] = [];
    if (data.headerbase64Image) {
      content.push({ image: data.headerbase64Image, width: size });
    }

    content.push(pdfmakeData);

    const qrcode = () => {
      if (data.qrcode) {

        if(data.qrCodeWidth){
          return { qr: data.qrcode, fit: `${data.qrCodeWidth}` };
        }else{
          return { qr: data.qrcode, fit: `${100}`};
        }
        

      }
    };

    const esign = () => {
      if (data.esign) {
        return [
          {
            image: data.esign.image,
            width: 100,
            alignment: "right",
          },
          { text: data.esign.nameLine1, alignment: "right" },
          { text: data.esign.nameLine2 || "", alignment: "right" },
        ];
      }
    };

    const signTable = [
      {
        layout: "noBorders",
        table: {
          widths: ["50%", "50%"],
          body: [[qrcode() || "", esign() || ""]],
        },
      },
    ];

      content.push(signTable);
    
    

    if(data.media && data.media?.singleImagePerPage){
      data.media.content.forEach((el,i)=>{
        
        if(i == 0){
          content.push({ image: el, width: size})
        }else{
          content.push({ image: el, width: size ,pageBreak:"before"})
        }
         
        })
    }else if((data.media)){
      const contentLength = data.media?.content.length -1
      let body: any[][]=[]
          data.media.content.forEach((el,i)=>{
            if(i%2 == 0 && i <  contentLength ){
              body.push( [
                { image: data.media?.content[i], width: size/2.1 || 1 }, 
                { image: data.media?.content[i+1], width: size/2.1 || 1 }
              ])
            }else if(i%2 == 0 && i ==  contentLength ){
              body.push( [
                { image: data.media?.content[i], width: size/2.1 || 1 }, 
                ""
              ])
            }
          })


          let imageTable = {
            layout: "noBorders",
            table: {
              body :body
            },
            pageBreak:"before"

          }
  
          content.push(imageTable)

    }


    const docDefinition = {
      pageSize: data.paperSize,
      pageMargins: [
        data.leftMargin || 40,
        data.topMargin || 40,
        data.rightMargin || 40,
        data.bottomMargin || 40,
      ],
      header: function (
        currentPage: number,
        pageCount: number,
        pageSize: { width: number }
      ) {
        if (data.header) {
          return data.header({
            currentPage: currentPage,
            pageCount: pageCount,
            pageSize: { width: pageSize.width },
          });
        }
      },
      footer: function (currentPage: any, pageCount: any, pageSize: any) {
        if (data.footer) {
          return data.footer({
            currentPage: currentPage,
            pageCount: pageCount,
            pageSize: { width: pageSize.width },
          });
        }
      },
      content: content,
      defaultStyle: {
        fontSize: 10,
        lineHeight: 1,
      },
      pageBreakBefore: function (currentNode: any) {
        return currentNode.style && currentNode.style.indexOf("pagebreak") > -1;
      },
    };

    pdfMake.vfs = pdfFonts as unknown as { [file: string]: string };
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-Italic.ttf",
      },
    };

    const curPdf = async (): Promise<Buffer | string> => {
      return new Promise((resolve, reject) => {
        const curPdf = pdfMake.createPdf(docDefinition as any);
        curPdf.getBase64((cb) => {
          if (data.base64) {
            resolve(cb);
          } else {
            const buf = Buffer.from(cb, "base64");
            resolve(buf);
          }
        });
      });
    };

    return await curPdf().then((data) => data);
  };
}
