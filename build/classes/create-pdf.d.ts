/// <reference types="node" />
import puppteer from 'puppeteer';
export default class CreatePdf {
    private browser;
    private pdfOptions;
    /**
     *
     * @param _pdfOtpions Puppeteers pdfoprions
     */
    constructor(_pdfOtpions: puppteer.PDFOptions);
    /**
     * This comples the html
     * @param html string
     * @param data data for mofiying html
     * @returns
     */
    compileHtmlString: (html: string, data?: any) => any;
    /**
     * creates the of PDF file
     * @param html string
     * @param data data to handlebars
     * @returns buffer
     */
    create: (html: string, data?: any) => Promise<Buffer>;
}
//# sourceMappingURL=create-pdf.d.ts.map