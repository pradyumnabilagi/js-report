/// <reference types="node" />
import puppeteer, { LaunchOptions, BrowserConnectOptions, BrowserLaunchArgumentOptions } from 'puppeteer';
declare type PuppeteerLounchOptions = BrowserLaunchArgumentOptions & LaunchOptions & BrowserConnectOptions;
export default class CreatePdf {
    private pdfOptions;
    private lounch;
    /**
     *
     * @param _pdfOtpions Puppeteers pdfoprions
     * @param _lounch  Puppeteer Lounch Options
     */
    constructor(_pdfOtpions: puppeteer.PDFOptions, _lounch?: PuppeteerLounchOptions);
    /**
     * This comples the html
     * @param html string
     * @param data data for mofiying html
     * @returns
     */
    compileHtmlString: (html: string, data?: any) => any;
    /**
     * creates the of PDF from pupp
     * @param html string
     * @param data data to handlebars
     * @returns buffer
     */
    create: (html: string, data?: any) => Promise<Buffer>;
}
export {};
//# sourceMappingURL=create-pdf.d.ts.map