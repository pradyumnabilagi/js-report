/// <reference types="node" />
import puppteer, { LaunchOptions, BrowserConnectOptions, BrowserLaunchArgumentOptions } from 'puppeteer-core';
declare type PuppeteerLounchOptions = BrowserLaunchArgumentOptions & LaunchOptions & BrowserConnectOptions;
export default class CreatePdf {
    private browser;
    private pdfOptions;
    private lounch;
    /**
     *
     * @param _pdfOtpions Puppeteers pdfoprions
     * @param _lounch  Puppeteer Lounch Options
     */
    constructor(_pdfOtpions: puppteer.PDFOptions, _lounch?: PuppeteerLounchOptions);
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
export {};
//# sourceMappingURL=create-pdf.d.ts.map